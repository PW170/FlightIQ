import { useNavigate, useLocation } from "react-router";
import { Plane, Compass, Bell, Settings, LogOut, LayoutDashboard, Ticket, History as HistoryIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { signOut } = useAuthActions();

    const navItems = [
        { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
        { icon: Compass, label: "Explore", path: "/dashboard/explore" },
        { icon: Ticket, label: "My Trips", path: "/dashboard/trips" },
        { icon: Bell, label: "Alerts", path: "/dashboard/alerts" },
        { icon: HistoryIcon, label: "History", path: "/dashboard/history" },
        { icon: Settings, label: "Settings", path: "/dashboard/settings" },
    ];

    return (
        <aside className={cn("w-64 border-r border-border/50 bg-black/20 backdrop-blur-xl flex flex-col h-screen sticky top-0", className)}>
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-white/5">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                    <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        <Plane className="h-4 w-4" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">Farely</span>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 py-6 px-3 flex flex-col gap-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-slate-500 group-hover:text-foreground")} />
                            {item.label}
                        </button>
                    )
                })}
            </div>

            {/* User / Footer */}
            <div className="p-4 border-t border-white/5">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={async () => {
                        await signOut();
                        sessionStorage.removeItem("farely_dashboard_visited");
                        navigate("/");
                    }}
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                </Button>
            </div>
        </aside>
    );
}
