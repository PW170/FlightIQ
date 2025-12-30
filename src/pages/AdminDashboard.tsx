import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Plane, Plus, Trash2, ArrowLeft, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const addDeal = useMutation(api.flights.addDeal);
    const deleteAllFlights = useMutation(api.flights.deleteAllFlights);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Auth Guard
    useEffect(() => {
        const token = localStorage.getItem("farely_admin_token");
        if (!token) {
            navigate("/admin/login");
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        route: "NYC ↔ LON",
        origin: "New York",
        destination: "London",
        airline: "Norse Atlantic",
        price: 320,
        outboundDuration: "7h 15m",
        outboundStops: 0,
        returnDuration: "8h 05m",
        returnStops: 0,
        departureDate: "Jan 12",
        returnDate: "Jan 22",
        priceScore: 9,
        comfortScore: 7,
        speedScore: 10,
        notes: "Direct flight, great availability.",
        bookingUrl: "https://skyscanner.com",
        featured: true,
    });

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "number" ? parseFloat(value) : value,
        }));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await addDeal(formData);
            toast.success("Mission Accomplished! 🚀", {
                description: `Deal for ${formData.route} is now live.`,
            });
            // Optionally reset some fields
        } catch (error) {
            toast.error("Telemetry failure", {
                description: "Failed to broadcast deal to users.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearAll = useCallback(async () => {
        if (!confirm("Wipe all flight data? This cannot be undone.")) return;

        setIsDeleting(true);
        try {
            const result = await deleteAllFlights();
            toast.success(`Redacted ${result.deleted} records.`);
        } catch (error) {
            toast.error("Cleanup failed.");
        } finally {
            setIsDeleting(false);
        }
    }, [deleteAllFlights]);

    const logout = () => {
        localStorage.removeItem("farely_admin_token");
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-background text-foreground relative py-20 px-4 font-sans uppercase tracking-tight">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[80%] h-[80%] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[60%] h-[60%] rounded-full bg-purple-900/10 blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-4xl relative z-10">
                {/* Top Header */}
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-full">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-black">COMMAND DASHBOARD</h1>
                            <p className="text-[10px] tracking-[0.3em] text-muted-foreground">FLIGHT DEAL PROTOCOL v2.0</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={logout} className="rounded-xl border-white/10 hover:bg-white/5 uppercase text-[10px] font-bold tracking-widest px-4">
                        TERMINATE SESSION
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-muted-foreground ml-1">ROUTE DISPLAY</label>
                                        <Input name="route" value={formData.route} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-muted-foreground ml-1">AIRLINE</label>
                                        <Input name="airline" value={formData.airline} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-xl" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-muted-foreground ml-1">ORIGIN CITY</label>
                                        <Input name="origin" value={formData.origin} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-muted-foreground ml-1">DESTINATION CITY</label>
                                        <Input name="destination" value={formData.destination} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-xl" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-muted-foreground ml-1">PRICE ($)</label>
                                        <Input type="number" name="price" value={formData.price} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-muted-foreground ml-1">DEPART DATE</label>
                                        <Input name="departureDate" value={formData.departureDate} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-muted-foreground ml-1">RETURN DATE</label>
                                        <Input name="returnDate" value={formData.returnDate} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-xl" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-muted-foreground ml-1">OUTBOUND DURATION / STOPS</label>
                                        <div className="flex gap-2">
                                            <Input name="outboundDuration" value={formData.outboundDuration} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-xl flex-1" />
                                            <Input type="number" name="outboundStops" value={formData.outboundStops} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-xl w-20" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-muted-foreground ml-1">RETURN DURATION / STOPS</label>
                                        <div className="flex gap-2">
                                            <Input name="returnDuration" value={formData.returnDuration} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-xl flex-1" />
                                            <Input type="number" name="returnStops" value={formData.returnStops} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-xl w-20" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-muted-foreground ml-1">PRICE SCORE (1-10)</label>
                                        <Input type="number" name="priceScore" value={formData.priceScore} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-xl" max="10" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-muted-foreground ml-1">COMFORT (1-10)</label>
                                        <Input type="number" name="comfortScore" value={formData.comfortScore} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-xl" max="10" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-muted-foreground ml-1">SPEED (1-10)</label>
                                        <Input type="number" name="speedScore" value={formData.speedScore} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-xl" max="10" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-muted-foreground ml-1">BOOKING LINK URL</label>
                                    <Input name="bookingUrl" value={formData.bookingUrl} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-xl" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-muted-foreground ml-1">COMMANDER'S NOTES</label>
                                    <Textarea name="notes" value={formData.notes} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-xl min-h-[100px] resize-none" />
                                </div>

                                <div className="flex items-center space-x-2 py-2">
                                    <Checkbox
                                        id="featured"
                                        checked={formData.featured}
                                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: !!checked }))}
                                        className="border-white/20 data-[state=checked]:bg-primary"
                                    />
                                    <label htmlFor="featured" className="text-[9px] font-bold text-white cursor-pointer uppercase tracking-widest">Mark as Featured Daily Deal</label>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg shadow-[0_0_30px_rgba(var(--primary),0.2)] transition-all flex items-center justify-center gap-3"
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                    ) : (
                                        <>
                                            <Plus className="h-6 w-6" />
                                            DEPLOY DEAL TO USERS
                                        </>
                                    )}
                                </Button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Sidebar / Utilities */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-red-500/10 border border-red-500/20 p-8 rounded-[2.5rem] backdrop-blur-xl"
                        >
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-red-500/20 mb-6 text-red-500">
                                <Trash2 className="h-6 w-6" />
                            </div>
                            <h2 className="text-xl font-black text-red-500 mb-2">DANGER ZONE</h2>
                            <p className="text-[10px] text-red-500/70 mb-8 font-bold leading-relaxed">THIS ACTION WILL ERASE ALL DEALS FROM THE DATABASE. ALL USERS WILL SEE AN EMPTY DASHBOARD.</p>

                            <Button
                                variant="destructive"
                                onClick={handleClearAll}
                                disabled={isDeleting}
                                className="w-full h-12 rounded-xl font-bold uppercase tracking-widest bg-red-500/80 hover:bg-red-500 transition-all border-none"
                            >
                                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "RESET SYSTEM"}
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl"
                        >
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-500/20 mb-6 text-blue-500">
                                <Info className="h-6 w-6" />
                            </div>
                            <h2 className="text-xl font-black text-white mb-2">QUICK TIPS</h2>
                            <ul className="text-[10px] text-muted-foreground space-y-4 font-bold tracking-wider list-none mt-6">
                                <li className="flex gap-2"><span className="text-primary">•</span> ROUTE: CITY ↔ CITY format works best for UI presentation.</li>
                                <li className="flex gap-2"><span className="text-primary">•</span> SCORE: Higher score = more prominent display in dashboard.</li>
                                <li className="flex gap-2"><span className="text-primary">•</span> URL: Always include the full https:// link.</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
