import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
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

                {/* Profile info removed as per user request to simplify accounts */}
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary italic">F</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
