import type { BusinessData } from '../../components/types'

export function generateContactRoute(business: BusinessData): string {
  return `import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Log the submission (replace with Resend in production)
    console.log('Contact form submission:', {
      business: '${business.name.replace(/'/g, "\\'")}',
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
    })

    // TODO: Uncomment when Resend is configured
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'website@yourdomain.com',
    //   to: '${business.email || 'owner@example.com'}',
    //   subject: \`New inquiry from \${name}\`,
    //   text: \`Name: \${name}\\nEmail: \${email}\\nPhone: \${phone || 'N/A'}\\nMessage: \${message}\`,
    // })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
`
}
