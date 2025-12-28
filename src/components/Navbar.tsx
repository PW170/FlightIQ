import { motion } from "framer-motion";
import { Plane, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-white/10 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="relative">
              <Plane className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-colors duration-300" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Flight<span className="text-primary">IQ</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#deals" className="text-sm hover:text-primary transition-colors">
              Daily Drops
            </a>
            <a href="#how-it-works" className="text-sm hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">
              Pricing
            </a>
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/20 backdrop-blur-sm border-white/30"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
            ) : (
              <Button 
                size="sm"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-background/95 backdrop-blur-xl">
              <div className="flex flex-col gap-4 mt-8">
                <a href="#deals" className="text-lg hover:text-primary transition-colors">
                  Daily Drops
                </a>
                <a href="#how-it-works" className="text-lg hover:text-primary transition-colors">
                  How It Works
                </a>
                <a href="#pricing" className="text-lg hover:text-primary transition-colors">
                  Pricing
                </a>
                {isAuthenticated ? (
                  <Button onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </Button>
                ) : (
                  <Button onClick={() => navigate("/auth")}>
                    Sign In
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
