import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, business, email, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }

    // In production, send via Resend
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'website@njdigital.com',
    //   to: 'neel@njdigital.com',
    //   subject: `New inquiry from ${name} — ${business}`,
    //   text: `Name: ${name}\nBusiness: ${business}\nEmail: ${email}\nMessage: ${message}`,
    // })

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
