import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { ReactNode } from "react";

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
            {/* Sidebar - Fixed width */}
            <Sidebar className="hidden md:flex flex-shrink-0" />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <Header />
                <main className="flex-1 p-6 lg:p-10 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
