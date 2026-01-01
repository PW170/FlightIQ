import { convexAuth } from "@convex-dev/auth/server";
import { Anonymous } from "@convex-dev/auth/providers/Anonymous";
import { emailOtp } from "./auth/emailOtp";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [emailOtp, Anonymous()],
  callbacks: {
    async createOrUpdateUser(ctx, args) {
      console.log("[Farely AUTH] createOrUpdateUser args:", JSON.stringify({
        provider: args.provider.id,
        profile: args.profile,
        existing: !!args.existingUserId
      }));

      // In Convex Auth Email Provider, the identifier is usually in 'email' or we extract it.
      // We'll try a few common locations just in case.
      const email = args.profile.email || (args.profile as any).identifier;

      let plan = "free";
      if (args.provider.id === "email-otp") {
        plan = "pro"; // Email users get Pro for now
      }

      if (args.existingUserId) {
        console.log("[Farely AUTH] Updating existing user:", args.existingUserId);
        await ctx.db.patch(args.existingUserId, {
          email: email ?? undefined,
          plan: plan,
          isAnonymous: args.provider.id === "anonymous"
        });
        return args.existingUserId;
      }

      console.log("[Farely AUTH] Inserting NEW user for:", email);
      const newUserId = await ctx.db.insert("users", {
        email: email,
        isAnonymous: args.provider.id === "anonymous",
        plan: plan,
        role: "user",
      });

      return newUserId;
    },
  },
});