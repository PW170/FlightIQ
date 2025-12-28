import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addEmailSignup = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("emailSignups")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      return { success: false, message: "Email already registered" };
    }

    await ctx.db.insert("emailSignups", {
      email: args.email,
      signupDate: Date.now(),
    });

    return { success: true, message: "Successfully signed up!" };
  },
});
