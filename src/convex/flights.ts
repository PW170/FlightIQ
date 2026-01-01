import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getDailyDeals = query({
  args: {},
  handler: async (ctx) => {
    const deals = await ctx.db
      .query("flights")
      .filter((q) => q.eq(q.field("featured"), true))
      .order("desc")
      .take(10);
    return deals;
  },
});

export const recordFlightView = mutation({
  args: { flightId: v.id("flights") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return; // Or throw error
    }

    // Record the view
    await ctx.db.insert("flightHistory", {
      userId,
      flightId: args.flightId,
      timestamp: Date.now(),
    });

    return { success: true };
  },
});

export const getFlightHistory = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const history = await ctx.db
      .query("flightHistory")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(50);

    // Fetch full flight details for each history entry
    const results = await Promise.all(
      history.map(async (entry) => {
        const flight = await ctx.db.get(entry.flightId);
        return {
          ...entry,
          flight,
        };
      })
    );

    return results.filter((r) => r.flight !== null);
  },
});

export const addDeal = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const dealId = await ctx.db.insert("flights", {
      route: args.route,
      origin: args.origin,
      destination: args.destination,
      airline: args.airline,
      price: args.price,
      outboundDuration: args.outboundDuration,
      outboundStops: args.outboundStops,
      returnDuration: args.returnDuration,
      returnStops: args.returnStops,
      departureDate: args.departureDate,
      returnDate: args.returnDate,
      priceScore: args.priceScore,
      comfortScore: args.comfortScore,
      speedScore: args.speedScore,
      notes: args.notes,
      bookingUrl: args.bookingUrl,
      featured: args.featured,
    });
    return dealId;
  },
});

export const deleteAllFlights = mutation({
  args: {},
  handler: async (ctx) => {
    const allFlights = await ctx.db.query("flights").collect();
    for (const flight of allFlights) {
      await ctx.db.delete(flight._id);
    }
    return { success: true, deleted: allFlights.length };
  },
});