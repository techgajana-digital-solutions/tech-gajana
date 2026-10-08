import { NextResponse } from 'next/server'

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxVP-DA7YmpEdSXWEbE02ZrSi6uaHX9Wqs59HL3z7-WRHLzuixLaa747Q-KmwdbwtuQ/exec';
const APPS_SCRIPT_SECRET = 'PUT_A_LONG_RANDOM_STRING_HERE';

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Honeypot: bots fill this, humans never see it
    if (body.website) return NextResponse.json({ ok: true })

    // Basic server-side validation
    if (!body.institution || !body.contactName || !body.email || !body.phone) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    const { website, ...payload } = body

    const res = await fetch(APPS_SCRIPT_URL!, {
      method: 'POST',
      // text/plain avoids any preflight issues with Apps Script
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...payload, secret: APPS_SCRIPT_SECRET }),
      redirect: 'follow',
    })

    const result = await res.json()
    if (!result.ok) throw new Error(result.error || 'Apps Script error')

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Enquiry submit failed:', err)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}