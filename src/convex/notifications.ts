import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getMyNotifications = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            return [];
        }

        // Fetch notifications for the user
        // Note: in a real app you might limit this or sort by timestamp desc
        const notifications = await ctx.db
            .query("notifications")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .order("desc") // If we indexed by timestamp this would fail without composite index, but default order is creation time usually if not specified or we can just filter. Schema has timestamp. 
            // Actually schema defines .index("by_user", ["userId"]) so order() implies creation time (system time) which roughly maps to insertion order.
            .collect();

        // Sort by timestamp desc to be sure
        return notifications.sort((a, b) => b.timestamp - a.timestamp);
    },
});

export const markAsRead = mutation({
    args: { notificationId: v.id("notifications") },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) return; // Should throw

        const notification = await ctx.db.get(args.notificationId);
        if (!notification || notification.userId !== userId) {
            // Not allowed
            return;
        }

        await ctx.db.patch(args.notificationId, { isRead: true });
    },
});

// Helper for dev testing: generate a sample notification
export const generateSampleNotification = mutation({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) return;

        await ctx.db.insert("notifications", {
            userId,
            title: "Price Drop Alert: Tokyo",
            message: "Flights to Tokyo (NRT) dropped to $450! Book now.",
            timestamp: Date.now(),
            isRead: false,
            type: "alert",
        });
    }
});
