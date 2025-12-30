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
    // Check sessionStorage on initial render
    return sessionStorage.getItem(DASHBOARD_VISITED_KEY) === "true";
  });

  // Track when user visits dashboard and store in sessionStorage
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      sessionStorage.setItem(DASHBOARD_VISITED_KEY, "true");
      setHasVisitedDashboard(true);
    }
  }, [location.pathname]);

  // Show dashboard button if authenticated OR if user has visited dashboard this session
  const showDashboard = isAuthenticated || hasVisitedDashboard;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 md:top-6 left-0 right-0 mx-auto z-50 w-[95%] md:w-[90%] max-w-5xl rounded-full border border-white/10 bg-black/20 backdrop-blur-md shadow-lg"
    >
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="relative">
              <Plane className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-colors duration-300" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Fare<span className="text-primary">ly</span>
            </span>
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
            {!isLoading && showDashboard ? (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 h-9 px-4"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
            ) : !isLoading ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/auth")}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Log In
                </button>
                <Button
                  size="sm"
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 h-9 px-4"
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
              <div className="flex flex-col gap-4 mt-8">
                <a href="#how-it-works" className="text-lg hover:text-primary transition-colors">
                  How It Works
                </a>
                <button
                  onClick={() => navigate("/pricing")}
                  className="text-lg hover:text-primary transition-colors text-left"
                >
                  Pricing
                </button>
                {!isLoading && showDashboard ? (
                  <Button onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </Button>
                ) : !isLoading ? (
                  <Button onClick={() => navigate("/auth")}>
                    Sign In
                  </Button>
                ) : null}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}