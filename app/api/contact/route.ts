import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["drumilnikhare29@gmail.com"],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #0f0f0f;">
          <p style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #737373; margin-bottom: 32px;">
            New message from portfolio
          </p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #737373; width: 80px;">From</td>
              <td style="padding: 12px 0; font-size: 14px;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #737373;">Email</td>
              <td style="padding: 12px 0; font-size: 14px;">${email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e5e5;">
              <td style="padding: 12px 0; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #737373;">Subject</td>
              <td style="padding: 12px 0; font-size: 14px;">${subject}</td>
            </tr>
          </table>
          <p style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #737373; margin-bottom: 12px;">Message</p>
          <p style="font-size: 15px; line-height: 1.8; color: #404040; white-space: pre-wrap;">${message}</p>
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e5e5;">
            <p style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #737373;">
              Sent via drumilnikhare.dev
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
