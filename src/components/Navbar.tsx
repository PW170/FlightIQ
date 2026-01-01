import { motion } from "framer-motion";
import { Plane, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router";
import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const DASHBOARD_VISITED_KEY = "farely_dashboard_visited";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [hasVisitedDashboard, setHasVisitedDashboard] = useState(() => {
    return sessionStorage.getItem(DASHBOARD_VISITED_KEY) === "true";
  });

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      sessionStorage.setItem(DASHBOARD_VISITED_KEY, "true");
      setHasVisitedDashboard(true);
    }
  }, [location.pathname]);

  const showDashboard = isAuthenticated || hasVisitedDashboard;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 mx-auto z-50 w-[95%] md:w-[85%] max-w-5xl rounded-full border border-white/5 bg-black/40 backdrop-blur-xl shadow-2xl"
    >
      <div className="px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center transition-colors group-hover:bg-primary/30">
            <Plane className="h-4 w-4 text-primary group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="text-lg font-bold tracking-tight">Farely</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <button
            onClick={() => navigate("/pricing")}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </button>

          <div className="h-4 w-[1px] bg-white/10 mx-2" />

          {!isLoading && showDashboard ? (
            <Button
              variant="secondary"
              size="sm"
              className="rounded-full h-9 px-5 font-semibold shadow-none hover:bg-secondary/80"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          ) : !isLoading ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/auth")}
                className="text-sm font-medium hover:text-primary transition-colors px-2"
              >
                Log In
              </button>
              <Button
                size="sm"
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground border-none h-9 px-5 font-semibold shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all hover:scale-105"
                onClick={() => navigate("/auth")}
              >
                Join Now
              </Button>
            </div>
          ) : null}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            key={`sheet-${isAuthenticated}-${isLoading}`}
            className="bg-background/95 backdrop-blur-xl border-white/10"
          >
            <div className="flex flex-col gap-6 mt-10">
              <a href="#how-it-works" className="text-xl font-semibold hover:text-primary transition-colors">
                How It Works
              </a>
              <button
                onClick={() => navigate("/pricing")}
                className="text-xl font-semibold hover:text-primary transition-colors text-left"
              >
                Pricing
              </button>
              <div className="h-[1px] bg-white/10 w-full" />
              {!isLoading && showDashboard ? (
                <Button size="lg" className="w-full" onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Button>
              ) : !isLoading ? (
                <div className="flex flex-col gap-3">
                  <Button size="lg" className="w-full" onClick={() => navigate("/auth")}>
                    Sign In
                  </Button>
                </div>
              ) : null}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}
