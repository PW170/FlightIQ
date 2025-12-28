import { Email } from "@convex-dev/auth/providers/Email";

export const emailOtp = Email({
  id: "email-otp",
  maxAge: 60 * 15, // 15 minutes
  async generateVerificationToken() {
    // Simple 6-digit OTP generation
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  },
  async sendVerificationRequest({ identifier: email, token }) {
    console.log(`[FlightIQ] Sending OTP ${token} to ${email}`);
  },
});
