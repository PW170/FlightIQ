import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { FlightDealCard } from "@/components/FlightDealCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, RefreshCcw, Database } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
    const deals = useQuery(api.flights.getDailyDeals);
    const seedFlights = useMutation(api.seed.seedFlights);
    const [isSeeding, setIsSeeding] = useState(false);

    const handleSeed = async () => {
        setIsSeeding(true);
        try {
            await seedFlights();
            toast.success("Demo data seeded successfully!");
        } catch (error) {
            console.error("Failed to seed data:", error);
            toast.error("Failed to seed demo data.");
        } finally {
            setIsSeeding(false);
        }
    };

    return (
        <div className="min-h-[100dvh] relative overflow-hidden bg-background text-foreground font-sans selection:bg-primary/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-orange-200/10 blur-[120px]" />
                <div className="absolute top-[20%] right-[0%] w-[60%] h-[60%] rounded-full bg-purple-900/20 blur-[100px]" />
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background z-[-1]" />
            </div>

            <Navbar />

            <main className="container mx-auto px-4 pt-32 pb-20 relative z-10">
                {/* Header Section */}
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-semibold mb-6 shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                            <Sparkles className="h-4 w-4" />
                            <span>Fresh Deals Dropped Today</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white drop-shadow-sm">
                            Your Daily <span className="text-primary italic">Flight Picks</span>
                        </h1>
                        <p className="text-slate-300 text-xl leading-relaxed">
                            Curated top-tier deals sorted by our signature <span className="text-white font-medium">FlightIQ score</span>.
                            Book fast—these prices rarely last more than 24 hours.
                        </p>
                    </motion.div>
                </div>

                {/* Content Section */}
                {deals === undefined ? (
                    // Loading State
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-[450px] rounded-3xl bg-white/5 animate-pulse border border-white/10" />
                        ))}
                    </div>
                ) : deals.length === 0 ? (
                    // Empty State
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 px-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl max-w-2xl mx-auto shadow-2xl"
                    >
                        <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10">
                            <Database className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4 text-white">No deals found today 😔</h3>
                        <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
                            Our curators are still hunting for the best bargains. Check back soon or seed some demo data to explore the interface.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full px-8 h-12 border-white/20 hover:bg-white/10 transition-all gap-2 w-full sm:w-auto text-white"
                                onClick={() => window.location.reload()}
                            >
                                <RefreshCcw className="h-4 w-4" />
                                Refresh Page
                            </Button>
                            <Button
                                size="lg"
                                className="rounded-full px-8 h-12 bg-primary hover:bg-primary/90 text-white shadow-lg transition-all gap-2 w-full sm:w-auto"
                                onClick={handleSeed}
                                disabled={isSeeding}
                            >
                                {isSeeding ? (
                                    <RefreshCcw className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Database className="h-4 w-4" />
                                )}
                                {isSeeding ? "Seeding..." : "Seed Demo Data"}
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    // Deals Grid
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {deals.map((deal, index) => (
                            <FlightDealCard key={deal._id} deal={deal} index={index} />
                        ))}
                    </div>
                )}

                {/* Footer CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center pb-10"
                >
                    <p className="text-slate-400 text-lg mb-4">Want more custom alerts?</p>
                    <Button variant="link" className="text-primary text-lg group h-auto p-0 hover:no-underline underline-offset-8 decoration-primary/30">
                        Configure Alerts <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
            </main>
        </div>
    );
}
