import { DashboardLayout } from "@/layouts/DashboardLayout";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, AlertTriangle } from "lucide-react";

export default function Settings() {
    const user = useQuery(api.users.currentUser);
    const isLoading = user === undefined;

    const plan = user?.plan || "free";

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight mb-2 italic">Subscription</h1>
                <p className="text-muted-foreground mb-8">Manage your billing and plan details.</p>

                <div className="space-y-6">
                    {/* Plan Details Card */}
                    <div className="p-8 rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-xl">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                                    <CreditCard className="h-8 w-8" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold tracking-tight">
                                        {plan.toLowerCase() === 'pro' ? 'Farely Business (Pro)' : 'Farely Standard (Free)'}
                                    </h2>
                                    <p className="text-muted-foreground mt-1 text-sm">
                                        {isLoading ? "Fetching plan details..." : `Current Tier: ${plan.toUpperCase()}`}
                                    </p>
                                </div>
                            </div>
                            {!isLoading && (
                                <Badge className={`uppercase text-[10px] tracking-widest py-1 px-3 border-none shadow-lg ${plan.toLowerCase() === 'pro'
                                        ? 'bg-primary text-primary-foreground shadow-primary/20'
                                        : 'bg-zinc-800 text-zinc-400'
                                    }`}>
                                    {plan.toUpperCase()}
                                </Badge>
                            )}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Status</h3>
                                <p className="text-foreground font-medium flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                    Active
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Usage</h3>
                                <p className="font-medium">
                                    {plan.toLowerCase() === 'pro' ? 'Unlimited Alerts' : '3 Active Alerts'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions Area */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-white/5 bg-black/20">
                        <div className="text-center sm:text-left">
                            <h3 className="font-semibold">Need to make a change?</h3>
                            <p className="text-sm text-muted-foreground mt-1">Upgrade or cancel your recurring subscription at any time.</p>
                        </div>

                        <div className="flex items-center gap-3">
                            {plan.toLowerCase() !== 'pro' ? (
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full px-8 shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all hover:scale-105">
                                    Upgrade to Pro
                                </Button>
                            ) : (
                                <Button variant="ghost" className="text-red-500 hover:bg-red-500/10 hover:text-red-400 border border-red-500/20 rounded-full px-6 flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" />
                                    Cancel Plan
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
