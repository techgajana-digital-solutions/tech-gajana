"use client";

import React, { useEffect, useRef, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface MouseState {
  x: number;
  y: number;
  active: boolean;
}

// ---------------------------------------------------------------------------
// Tunables
// ---------------------------------------------------------------------------

const PARTICLE_COUNT = 2500;
const PARTICLE_RADIUS = 8;
const GRAVITY = 0.35;
const FLOOR_FRICTION = 0.82; // damping when resting on floor
const AIR_DRAG = 0.995;
const REPEL_RADIUS = 90;
const REPEL_STRENGTH = 3.2;
const SEPARATION_STRENGTH = 0.55; // how hard neighboring particles push apart
const GRID_CELL = PARTICLE_RADIUS * 4; // spatial hash cell size

// Click / tap burst settings
const MAX_TOTAL_PARTICLES = 4000;
const SPAWN_COUNT = 40;
const SPAWN_SPEED_MIN = 2;
const SPAWN_SPEED_MAX = 6;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<MouseState>({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });

  // -------------------------------------------------------------------------
  // Spatial hash grid — keeps neighbor lookups O(n) instead of O(n^2)
  // -------------------------------------------------------------------------
  const buildGrid = useCallback((particles: Particle[]) => {
    const grid = new Map<string, number[]>();
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const cx = Math.floor(p.x / GRID_CELL);
      const cy = Math.floor(p.y / GRID_CELL);
      const key = `${cx},${cy}`;
      const bucket = grid.get(key);
      if (bucket) {
        bucket.push(i);
      } else {
        grid.set(key, [i]);
      }
    }
    return grid;
  }, []);

  // -------------------------------------------------------------------------
  // Initialize particles across the canvas
  // -------------------------------------------------------------------------
  const seedParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.6, // start in upper portion, let them fall
        vx: 0,
        vy: 0,
        r: PARTICLE_RADIUS,
      });
    }
    particlesRef.current = particles;
  }, []);

  // -------------------------------------------------------------------------
  // Resize handling
  // -------------------------------------------------------------------------
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = container.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxRef.current = ctx;
    }

    const prevW = sizeRef.current.w;
    sizeRef.current = { w: rect.width, h: rect.height };

    // Only reseed on first mount, otherwise just clamp existing particles
    // into the new bounds so a resize doesn't reset the "settled" pile.
    if (particlesRef.current.length === 0) {
      seedParticles(rect.width, rect.height);
    } else if (prevW !== rect.width) {
      particlesRef.current.forEach((p) => {
        p.x = Math.min(p.x, rect.width - p.r);
        p.y = Math.min(p.y, rect.height - p.r);
      });
    }
  }, [seedParticles]);

  // -------------------------------------------------------------------------
  // Spawn a burst of particles at a point (click / tap)
  // -------------------------------------------------------------------------
  const spawnBurst = useCallback((x: number, y: number) => {
    const particles = particlesRef.current;
    const room = MAX_TOTAL_PARTICLES - particles.length;
    if (room <= 0) return;

    const count = Math.min(SPAWN_COUNT, room);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed =
        SPAWN_SPEED_MIN + Math.random() * (SPAWN_SPEED_MAX - SPAWN_SPEED_MIN);

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: PARTICLE_RADIUS,
      });
    }
  }, []);

  // -------------------------------------------------------------------------
  // Physics step
  // -------------------------------------------------------------------------
  const step = useCallback(() => {
    const { w, h } = sizeRef.current;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // 1. Integrate gravity + mouse repulsion
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.vy += GRAVITY;
      p.vx *= AIR_DRAG;
      p.vy *= AIR_DRAG;

      if (mouse.active) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const rad = REPEL_RADIUS;
        if (distSq < rad * rad && distSq > 0.0001) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / rad) * REPEL_STRENGTH;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      // Floor / walls
      if (p.y > h - p.r) {
        p.y = h - p.r;
        p.vy *= -0.15; // tiny bounce then settle
        p.vx *= FLOOR_FRICTION;
      }
      if (p.y < p.r) {
        p.y = p.r;
        p.vy *= -0.2;
      }
      if (p.x < p.r) {
        p.x = p.r;
        p.vx *= -0.3;
      }
      if (p.x > w - p.r) {
        p.x = w - p.r;
        p.vx *= -0.3;
      }
    }

    // 2. Cheap neighbor separation (sand-like piling) via spatial hash
    const grid = buildGrid(particles);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const cx = Math.floor(p.x / GRID_CELL);
      const cy = Math.floor(p.y / GRID_CELL);

      for (let ox = -1; ox <= 1; ox++) {
        for (let oy = -1; oy <= 1; oy++) {
          const bucket = grid.get(`${cx + ox},${cy + oy}`);
          if (!bucket) continue;

          for (const j of bucket) {
            if (j <= i) continue; // avoid double-processing pairs
            const q = particles[j];
            const dx = q.x - p.x;
            const dy = q.y - p.y;
            const minDist = p.r + q.r;
            const distSq = dx * dx + dy * dy;

            if (distSq < minDist * minDist && distSq > 0.0001) {
              const dist = Math.sqrt(distSq);
              const overlap = (minDist - dist) * SEPARATION_STRENGTH;
              const nx = dx / dist;
              const ny = dy / dist;

              p.x -= nx * overlap * 0.5;
              p.y -= ny * overlap * 0.5;
              q.x += nx * overlap * 0.5;
              q.y += ny * overlap * 0.5;
            }
          }
        }
      }
    }

    // 3. Render
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.moveTo(p.x + p.r, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      }
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(step);
  }, [buildGrid]);

  // -------------------------------------------------------------------------
  // Mount / unmount
  // -------------------------------------------------------------------------
  useEffect(() => {
    resizeCanvas();
    rafRef.current = requestAnimationFrame(step);

    const handleResize = () => resizeCanvas();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------------------------------------------------------------------
  // Mouse tracking — listens on the container so overlaid text
  // (which has pointer-events-none) never blocks the interaction.
  // -------------------------------------------------------------------------
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const touch = e.touches[0];
    if (!rect || !touch) return;
    mouseRef.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
      active: true,
    };
  };

  const handleTouchEnd = () => {
    mouseRef.current.active = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    spawnBurst(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const touch = e.touches[0];
    if (!rect || !touch) return;
    spawnBurst(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  // -------------------------------------------------------------------------
  // Footer navigation content
  // -------------------------------------------------------------------------
  const columns: { title: string; links: string[] }[] = [
    { title: "Channels", links: ["Instagram", "LinkedIn", "YouTube"] },
    { title: "Legalites", links: ["Privacy Policy", "Terms of Service", "Cookies", "Licensing"] },
    { title: "Contact", links: ["TechGajana@studio.com", "+91 9876543210", "Support", "Press"] },
    { title: "Headquarters", links: ["123 Studio Ave", "San Francisco, CA", "94103", "United States"] },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      className="relative w-full h-[100vh] min-h-[640px] overflow-hidden bg-black select-none cursor-pointer"
    >
      {/* Particle canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />

      {/* Content layer */}
      <div className="relative z-10 flex h-full w-full flex-col pointer-events-none">
        {/* Center graphic placeholder */}
        <div className="flex flex-1 items-start justify-center pt-16">
          <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-white bg-white backdrop-blur-sm md:h-32 md:w-32">
            <img
              src="/tg.png"
              alt="Studio Logo"
              className="h-50 w-50 object-contain"
            />
          </div>
        </div>

        {/* Bottom navigation grid */}
        <div className="flex-1 w-full px-6 pb-8 md:px-12 md:pb-12">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            {/* Left: massive headline */}
            <h2 className="text-4xl font-bold leading-[0.95] text-white sm:text-5xl md:text-7xl lg:text-8xl">
              Get to
              <br />
              know more
            </h2>

            {/* Right: 4-column link grid */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:w-1/2 md:gap-6 align-items-start md:justify-end">
              {columns.map((col) => (
                <div key={col.title} className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                    {col.title}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {col.links.map((link) => (
                      <li key={link}>
                        <span className="pointer-events-auto cursor-pointer text-sm text-white/60 transition-colors hover:text-white">
                          {link}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;