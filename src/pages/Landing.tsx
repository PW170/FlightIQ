import { motion } from "framer-motion";
import { Plane, Sparkles, TrendingDown, Zap } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { FlightDealCard } from "@/components/FlightDealCard";
import { EmailSignupForm } from "@/components/EmailSignupForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Landing() {
  const deals = useQuery(api.flights.getDailyDeals);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-shift" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Updated Daily • Jan 2026 Edition</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Today's Backpacker
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                Steals ✈️
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              5 IQ Picks under $500: Europe, Middle East & U.S. adventures await! 💸
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => {
                  const dealsSection = document.getElementById("deals");
                  dealsSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <TrendingDown className="mr-2 h-5 w-5" />
                View Today's Deals
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30"
                onClick={() => navigate("/auth")}
              >
                <Zap className="mr-2 h-5 w-5" />
                Get Custom Routes
              </Button>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-center mb-12"
          >
            <p className="text-lg text-muted-foreground italic">
              "FlightIQ's Daily Drops: We hunt. You adventure." 🌍
            </p>
          </motion.div>
        </div>
      </section>

      {/* Deals Section */}
      <section id="deals" className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Today's IQ Picks 🔥
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hand-picked deals scoring 85+ on our 3-checkpoint system: Price, Comfort & Speed
            </p>
          </motion.div>

          {deals === undefined ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-96 rounded-2xl bg-white/10 backdrop-blur-xl animate-pulse"
                />
              ))}
            </div>
          ) : deals.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Plane className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">Slim pickings today!</h3>
              <p className="text-muted-foreground">Check back tomorrow for fresh deals 🌅</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.map((deal, index) => (
                <FlightDealCard key={deal._id} deal={deal} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <EmailSignupForm />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              The FlightIQ System 🎯
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our 3-checkpoint scoring ensures you only see the absolute best deals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "💸",
                title: "Price (40%)",
                description: "Under average for the route, ideally <$300. We track historical data to spot real bargains.",
              },
              {
                icon: "🛋️",
                title: "Comfort (30%)",
                description: "30\"+ legroom, WiFi, entertainment. We favor full-service over ultra-budget carriers.",
              },
              {
                icon: "⚡",
                title: "Speed (30%)",
                description: "Direct or 1-stop max, <10hr/leg. Your time is precious—we respect that.",
              },
            ].map((checkpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 text-center"
              >
                <div className="text-5xl mb-4">{checkpoint.icon}</div>
                <h3 className="text-xl font-bold mb-2">{checkpoint.title}</h3>
                <p className="text-muted-foreground">{checkpoint.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">
              Flight<span className="text-primary">IQ</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Curating the best backpacker flight deals since 2025
          </p>
          <p className="text-xs text-muted-foreground">
            We earn a small commission at no extra cost to you. Your support keeps FlightIQ free! 🙏
          </p>
        </div>
      </footer>
    </div>
  );
}