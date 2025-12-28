import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    ...authTables,

    users: defineTable({
      name: v.optional(v.string()),
      image: v.optional(v.string()),
      email: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
      isAnonymous: v.optional(v.boolean()),
      role: v.optional(roleValidator),
      isPremium: v.optional(v.boolean()),
    }).index("email", ["email"]),

    flights: defineTable({
      route: v.string(),
      origin: v.string(),
      destination: v.string(),
      airline: v.string(),
      price: v.number(),
      outboundDuration: v.string(),
      outboundStops: v.number(),
      returnDuration: v.string(),
      returnStops: v.number(),
      departureDate: v.string(),
      returnDate: v.string(),
      priceScore: v.number(),
      comfortScore: v.number(),
      speedScore: v.number(),
      notes: v.string(),
      bookingUrl: v.string(),
      featured: v.boolean(),
    })
      .index("by_featured", ["featured"])
      .index("by_price", ["price"]),

    emailSignups: defineTable({
      email: v.string(),
      signupDate: v.number(),
    }).index("by_email", ["email"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;