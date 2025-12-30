import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

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