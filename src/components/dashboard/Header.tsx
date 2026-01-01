import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function Header() {
    const user = useQuery(api.users.currentUser);
    const isLoading = user === undefined;

    return (
        <header className="h-16 border-b border-border/50 bg-black/10 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
            {/* Search Area */}
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-full max-w-md hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search flights..."
                        className="w-full h-9 pl-9 pr-4 rounded-full bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>

                <div className="h-4 w-[1px] bg-white/10" />

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        {isLoading ? (
                            <div className="space-y-1">
                                <div className="h-3 w-16 bg-white/10 animate-pulse rounded" />
                                <div className="h-2 w-12 bg-white/10 animate-pulse rounded" />
                            </div>
                        ) : (
                            <>
                                <p className="text-sm font-medium leading-none">{user?.name || (user?.email?.split('@')[0]) || "Guest"}</p>
                                <p className="text-[10px] uppercase tracking-wider text-primary mt-1 font-bold">
                                    {(user?.plan || "Free").toUpperCase()} PLAN
                                </p>
                            </>
                        )}
                    </div>
                    <Avatar className="h-8 w-8 border border-white/10 hover:border-white/20 transition-colors">
                        <AvatarImage src={user?.image} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                            {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "G"}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
