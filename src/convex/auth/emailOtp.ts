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
    // DEVELOPMENT LOG: Always log the OTP to the console so developers can sign in 
    // even if Resend limits apply (e.g. sending to non-authorized emails on free plan).
    console.log(`
[Farely AUTH] ---------------------------------------
[Farely AUTH] OTP: ${token}
[Farely AUTH] To: ${email}
[Farely AUTH] ---------------------------------------
    `);

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: "Farely <onboarding@resend.dev>",
        to: [email],
        subject: `Your Farely Login Code: ${token}`,
        text: `Welcome back to Farely! Your verification code is: ${token}`,
      });

      if (error) {
        console.error("[Farely] Resend email error (handled):", error);
        // We don't throw error here in development if we want to allow 
        // using the OTP from the console. But standard behavior is to throw.
        // Let's log that the console fallback is available.
        console.log("[Farely] EMAIL FAILED: Please use the OTP logged above in the console.");
      } else {
        console.log(`[Farely] Sending OTP ${token} to ${email} via Resend`);
      }
    } catch (err) {
      console.error("[Farely] Unexpected error during email send:", err);
      console.log("[Farely] Use the OTP from the console log above.");
    }
  },
});
