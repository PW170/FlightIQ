import { motion } from "framer-motion";
import { Check, Plane, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useNavigate } from "react-router";

export default function Pricing() {
    const navigate = useNavigate();

    const benefits = [
        "Custom flight booking with AI",
        "Real-time deal notifications",
        "Priority support (24/7)",
        "Exclusive error-fare alerts",
        "Personalized route optimization",
        "Unlimited searches & tracking"
    ];

    return (
        <div className="min-h-[100dvh] relative overflow-hidden bg-background text-foreground font-sans selection:bg-primary/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute bottom-[0%] right-[0%] w-[60%] h-[60%] rounded-full bg-purple-900/10 blur-[100px]" />
            </div>

            <Navbar />

            <main className="relative pt-32 pb-20 px-4 min-h-[90dvh] flex flex-col items-center justify-center">
                <div className="container mx-auto max-w-4xl text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                            Simple, Powerful <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                                Premium Pricing
                            </span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Join the elite travelers and unlock AI-powered flight discoveries.
                            One simple plan, no hidden fees.
                        </p>
                    </motion.div>
                </div>

                <div className="container mx-auto max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative p-8 rounded-[2.5rem] border border-primary/30 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden group"
                    >
                        {/* Glossy Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/50 group-hover:scale-110 transition-transform duration-500">
                                <Plane className="h-8 w-8 text-primary" />
                            </div>

                            <h2 className="text-3xl font-bold mb-1">Aviator</h2>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-5xl font-black">$2.99</span>
                                <span className="text-muted-foreground font-medium">/mo</span>
                            </div>

                            <div className="w-full space-y-4 mb-8">
                                {benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                            <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                                        </div>
                                        <span className="text-sm font-medium text-foreground/80">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                onClick={() => navigate("/auth")}
                                size="lg"
                                className="w-full rounded-2xl h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Get Started Now <Zap className="ml-2 h-5 w-5 fill-current" />
                            </Button>

                            <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
                                <Sparkles className="h-3 w-3" /> Secure payment via Stripe
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative py-12 px-4 border-t border-white/10 mt-auto">
                <div className="container mx-auto max-w-6xl text-center text-sm text-muted-foreground">
                    <p>© 2025 FlightIQ. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
