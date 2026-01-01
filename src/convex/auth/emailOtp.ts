import { Email } from "@convex-dev/auth/providers/Email";
import { Resend } from "resend";

export const emailOtp = Email({
  id: "email-otp",
  async generateVerificationToken() {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const otp = (array[0] % 900000 + 100000).toString();
    return otp;
  },
  async sendVerificationRequest({ identifier: email, token }) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Developer fallback: Log OTP to console in case email fails or for quick local testing
    console.log(`
[Farely AUTH] ---------------------------------------
[Farely AUTH] OTP: ${token}
[Farely AUTH] To: ${email}
[Farely AUTH] ---------------------------------------
    `);

    try {
      const { error } = await resend.emails.send({
        from: "Farely <login@aspid.site>",
        to: [email],
        subject: `Your Farely Verification Code: ${token}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Welcome to Farely! ✈️</h2>
            <p>Your verification code is:</p>
            <h1 style="color: #4F46E5; letter-spacing: 2px;">${token}</h1>
            <p>Enter this code to complete your login.</p>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">If you didn't request this, you can safely ignore this email.</p>
          </div>
        `,
        text: `Your Farely verification code is: ${token}`,
      });

      if (error) {
        console.error("[Farely] Resend Error:", error);
        throw new Error(`Failed to send email: ${error.message}`);
      }
    } catch (err) {
      console.error("[Farely] Failed to send email via Resend:", err);
      // In development, we might want to allow the process to continue so the dev can use the console OTP.
      // But in production, this should likely throw.
      if (process.env.NODE_ENV !== "development") {
        throw new Error("Could not send verification email");
      }
    }
  },
});
