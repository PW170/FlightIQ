import { DashboardLayout } from "@/layouts/DashboardLayout";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Settings() {
    const user = useQuery(api.users.currentUser);
    const isLoading = user === undefined;

    const plan = user?.plan || "free";
    const role = user?.role || "user";
    const displayName = user?.name || (user?.email?.split('@')[0]) || "Guest User";
    const displayEmail = user?.email || (user?.isAnonymous ? "Anonymous Guest" : "");

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight mb-2 italic">Account Settings</h1>
                <p className="text-muted-foreground mb-8">Manage your profile and subscription tier.</p>

                <div className="space-y-6">
                    {/* Profile Card */}
                    <div className="p-8 rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-xl transition-all hover:border-white/10">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                            <Avatar className="h-24 w-24 border-2 border-white/10 shadow-2xl">
                                <AvatarImage src={user?.image} />
                                <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold italic">
                                    {displayName[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 text-center sm:text-left">
                                {isLoading ? (
                                    <div className="space-y-3">
                                        <div className="h-6 w-32 bg-white/5 animate-pulse rounded mx-auto sm:mx-0" />
                                        <div className="h-4 w-48 bg-white/5 animate-pulse rounded mx-auto sm:mx-0" />
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold tracking-tight">{displayName}</h2>
                                        <p className="text-muted-foreground mt-1">{displayEmail}</p>

                                        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                                            <Badge variant="outline" className="uppercase text-[10px] tracking-widest border-white/10 py-1">
                                                {role}
                                            </Badge>
                                            <Badge className={`uppercase text-[10px] tracking-widest py-1 border-none shadow-lg ${plan.toLowerCase() === 'pro'
                                                    ? 'bg-primary text-primary-foreground shadow-primary/20'
                                                    : 'bg-zinc-800 text-zinc-400'
                                                }`}>
                                                {plan.toUpperCase()} PLAN
                                            </Badge>
                                        </div>
                                    </>
                                )}
                            </div>

                            {!isLoading && (
                                <Button variant="secondary" className="rounded-full px-6 font-semibold hover:scale-105 active:scale-95 transition-all">
                                    Edit Profile
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Plan Details */}
                    <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/40">
                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            Subscription Details
                        </h3>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <p className="font-medium text-lg">
                                    {plan.toLowerCase() === 'pro' ? 'Farely Premium (Pro)' : 'Farely Standard (Free)'}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1 max-w-sm leading-relaxed">
                                    {plan.toLowerCase() === 'pro'
                                        ? "Active since 2026. You have unlimited access to all premium flight deals and priority alerts."
                                        : "You are currently on the free tier. Upgrade to unlock instant price drop alerts and worldwide coverage."}
                                </p>
                            </div>

                            {plan.toLowerCase() !== 'pro' ? (
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full h-12 px-8 shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all hover:scale-105">
                                    Upgrade to Pro
                                </Button>
                            ) : (
                                <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/5 px-4 py-2 rounded-full">
                                    Active Subscription
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="p-6 rounded-2xl border border-red-500/10 bg-red-500/[0.02]">
                        <h3 className="text-lg font-semibold text-red-500 mb-4 flex items-center gap-2">
                            Danger Zone
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="font-semibold text-red-400">Delete Account</p>
                                <p className="text-sm text-red-500/60">This will permanently remove all your data and alerts.</p>
                            </div>
                            <Button variant="ghost" className="text-red-500 hover:bg-red-500/10 hover:text-red-400 border border-red-500/20 rounded-full px-6">
                                Delete Permanently
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
