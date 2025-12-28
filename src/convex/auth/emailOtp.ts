import { Email } from "@convex-dev/auth/providers/Email";
import { Resend } from "resend";

export const emailOtp = Email({
  id: "email-otp",
  maxAge: 60 * 15, // 15 minutes
  async generateVerificationToken() {
    // Simple 6-digit OTP generation
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  },
  async sendVerificationRequest({ identifier: email, token }) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "FlightIQ <onboarding@resend.dev>",
      to: [email],
      subject: `Your FlightIQ Login Code: ${token}`,
      text: `Welcome back to FlightIQ! Your verification code is: ${token}`,
    });

    if (error) {
      console.error("[FlightIQ] Resend email error:", error);
      throw new Error("Failed to send verification email");
    }

    console.log(`[FlightIQ] Sending OTP ${token} to ${email} via Resend`);
  },
});
