import { convexAuth } from "@convex-dev/auth/server";
import { Anonymous } from "@convex-dev/auth/providers/Anonymous";
import { emailOtp } from "./auth/emailOtp";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [emailOtp, Anonymous()],
  callbacks: {
    async createOrUpdateUser(ctx, args) {
      const providerId = args.provider.id;
      const profile = args.profile || {};

      console.log(`[Farely AUTH] [${providerId}] Attempting createOrUpdateUser. Profile:`, JSON.stringify(profile));

      // Extract email safely
      const email = profile.email || (profile as any).identifier;

      let plan = "free";
      if (providerId === "email-otp") {
        plan = "pro";
      }

      if (args.existingUserId) {
        console.log(`[Farely AUTH] [${providerId}] Updating existing user: ${args.existingUserId}`);
        await ctx.db.patch(args.existingUserId, {
          email: email ?? undefined,
          plan: plan,
          isAnonymous: providerId === "anonymous"
        });
        return args.existingUserId;
      }

      console.log(`[Farely AUTH] [${providerId}] Creating NEW user. Email: ${email || 'None'}`);
      const newUserId = await ctx.db.insert("users", {
        email: email,
        isAnonymous: providerId === "anonymous",
        plan: plan,
        role: "user",
      });

      return newUserId;
    },
  },
});