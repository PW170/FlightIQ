import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simple password check against VITE_ADMIN_PASSWORD
        // Note: In a production app, this should be handled by a proper auth system.
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

        setTimeout(() => {
            if (password === adminPassword) {
                localStorage.setItem("farely_admin_token", "true_" + Date.now());
                toast.success("Welcome back, Commander! 🫡");
                navigate("/admin/dashboard");
            } else {
                toast.error("Invalid access code", {
                    description: "Please try again or contact system admin.",
                });
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans uppercase tracking-widest">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute bottom-[0%] right-[0%] w-[60%] h-[60%] rounded-full bg-purple-900/10 blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm z-10"
            >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/50 group-hover:scale-110 transition-transform duration-500">
                            <Lock className="h-8 w-8 text-primary" />
                        </div>

                        <h1 className="text-2xl font-black mb-2 text-white">ADMIN PORTAL</h1>
                        <p className="text-[10px] text-muted-foreground mb-8 text-center">SECURE ACCESS ONLY</p>

                        <form onSubmit={handleLogin} className="w-full space-y-4">
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="ENTER ACCESS CODE"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white/5 border-white/10 h-12 text-center text-sm placeholder:text-[10px] tracking-[0.5em] focus:bg-white/10 transition-all rounded-xl"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    "AUTHORIZE"
                                )}
                            </Button>
                        </form>

                        <button
                            onClick={() => navigate("/")}
                            className="mt-6 text-[9px] text-muted-foreground hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-0.5"
                        >
                            RETURN TO COMMAND CENTER
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
