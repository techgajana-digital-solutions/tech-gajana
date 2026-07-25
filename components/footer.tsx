'use client'

import { Heart, Share2, Users, Code, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Company: ['About Us', 'Careers', 'Contact', 'Blog'],
    Services: ['Courses', 'Store', 'Consultancy', 'Mentorship'],
    Support: [
      'Internship Support',
      'Course Enquiry',
      'Store Support',
      'Technical Help',
    ],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'],
  }

  const socialLinks = [
    { icon: Share2, href: '#', label: 'Twitter' },
    { icon: Heart, href: '#', label: 'Social' },
    { icon: Users, href: '#', label: 'Community' },
    { icon: Code, href: '#', label: 'GitHub' },
    { icon: Mail, href: '#', label: 'Email' },
  ]

  return (
    <footer className="bg-foreground text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="font-bold text-lg">TechGajana</span>
            </div>
            <p className="text-white/60 text-sm">
              Empowering builders with software, mentorship, and innovation.
            </p>
          </div>

          {/* Links Grid */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold mb-4 text-sm">{category}</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-white/60 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 py-8">
          {/* Social & Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="text-white/60 text-sm">
              © {currentYear} TechGajana. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    title={social.label}
                    className="inline-flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-primary rounded-full transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
