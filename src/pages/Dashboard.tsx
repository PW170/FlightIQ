import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { FlightDealCard } from "@/components/FlightDealCard";
import { motion } from "framer-motion";
import { TrendingUp, Plane, Bell, Database } from "lucide-react";

export default function Dashboard() {
    const deals = useQuery(api.flights.getDailyDeals);
    const user = useQuery(api.users.currentUser);

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Welcome Header */}
                <div className="pb-2">
                    <h1 className="text-3xl font-bold tracking-tight italic">Flight Discovery</h1>
                    <p className="text-muted-foreground">The best opportunities detected in the last 24 hours.</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: "Total Savings Potential", value: "$4,250", icon: TrendingUp, color: "text-green-500" },
                        { label: "Active Deal Alerts", value: "12", icon: Bell, color: "text-amber-500" },
                        { label: "Tracked Routes", value: "8", icon: Plane, color: "text-blue-500" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-card border border-border/50 rounded-xl p-6 flex items-start justify-between hover:border-border transition-colors"
                        >
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Section Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Daily Opportunities</h2>
                        <p className="text-muted-foreground">High-value flights detected in the last 24 hours.</p>
                    </div>
                </div>

                {/* Content Grid */}
                {deals === undefined ? (
                    // Loading State
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-[300px] rounded-2xl bg-white/5 animate-pulse border border-white/10" />
                        ))}
                    </div>
                ) : deals.length === 0 ? (
                    // Empty State
                    <div className="text-center py-20 rounded-2xl border border-dashed border-white/10 bg-white/5">
                        <Database className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No deals found</h3>
                        <p className="text-muted-foreground">Check back later for new inventory.</p>
                    </div>
                ) : (
                    // Deals Grid
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deals.map((deal, index) => (
                            <FlightDealCard key={deal._id} deal={deal} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
