import { NextResponse } from 'next/server'

export async function GET() {
    const EVENTS_SHEET_API_URL = "https://script.google.com/macros/s/AKfycbyR0eRtFiIZjmM4kEQfnhpFODimKANQx-q6SGjNeLZnEYNl0ulPm6ce0AG-UpydPbiU/exec"

  const url = EVENTS_SHEET_API_URL
  if (!url) {
    return NextResponse.json({ problem: 'EVENTS_SHEET_API_URL is not set (or the server was not restarted)' })
  }

  try {
    const res = await fetch(url, { cache: 'no-store' })
    const text = await res.text()

    let rows: any[]
    try {
      rows = JSON.parse(text)
    } catch {
      return NextResponse.json({
        problem: 'Response is not JSON. Usually a Google sign-in page, so set "Who has access" to Anyone.',
        status: res.status,
        preview: text.slice(0, 300),
      })
    }

    return NextResponse.json({
      status: res.status,
      rowCount: rows.length,
      rows: rows.map((r) => ({
        keys: Object.keys(r).filter((k) => ['slug', 'published', 'status', 'startDate'].includes(k.trim())),
        slug: r.slug,
        published: r.published,
        publishedType: typeof r.published,
        status: r.status,
      })),
    })
  } catch (e: any) {
    return NextResponse.json({ problem: 'Fetch failed', message: String(e?.message ?? e) })
  }
}