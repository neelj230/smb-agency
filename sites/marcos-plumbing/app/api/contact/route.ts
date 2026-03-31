import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const { name, email, phone, message } = data

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // In production, this calls sendContactEmail from @/integrations/actions/contact
    // For static export / proof-of-concept, we log and return success
    console.log('Contact form submission:', { name, email, phone, message })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to process contact form.' },
      { status: 500 }
    )
  }
}
