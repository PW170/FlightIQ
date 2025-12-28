import { motion } from "framer-motion";
import { Plane, Sparkles, TrendingDown, Zap, Globe, MapPin, ArrowRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { FlightDealCard } from "@/components/FlightDealCard";
import { EmailSignupForm } from "@/components/EmailSignupForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Landing() {
  const deals = useQuery(api.flights.getDailyDeals);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Background Gradients matching reference */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top Left Peach/Light Glow */}
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-orange-200/10 blur-[120px]" />
        {/* Bottom Right Purple Glow */}
        <div className="absolute top-[20%] right-[0%] w-[60%] h-[60%] rounded-full bg-purple-900/20 blur-[100px]" />
        {/* Center Deep Blue/Purple */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/80 z-[-1]" />
      </div>
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 min-h-[90vh] flex items-center">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-left z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Daily Drops Live Now</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Unlock Top <br />
              Flight Deals <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
                You Thought Were
              </span> <br />
              Out of Reach.
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
              5 IQ Picks under $500. Europe, Asia & Americas. 
              Now just one click away.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-16">
              <Button 
                size="lg" 
                className="rounded-full text-lg px-8 h-14 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
                onClick={() => {
                  const dealsSection = document.getElementById("deals");
                  dealsSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-4 ml-4">
                 <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="h-full w-full object-cover" />
                      </div>
                    ))}
                 </div>
                 <div className="text-sm">
                    <p className="font-bold">20k+</p>
                    <p className="text-muted-foreground text-xs">Happy Travelers</p>
                 </div>
              </div>
            </div>

            {/* Logos Strip */}
            <div className="flex items-center gap-8 opacity-50 grayscale">
               <span className="text-lg font-bold flex items-center gap-2"><Plane className="h-5 w-5" /> Expedia</span>
               <span className="text-lg font-bold flex items-center gap-2"><Globe className="h-5 w-5" /> Skyscanner</span>
               <span className="text-lg font-bold flex items-center gap-2"><MapPin className="h-5 w-5" /> Kayak</span>
            </div>
          </motion.div>

          {/* Right Visual - Orbit System */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[600px] w-full flex items-center justify-center hidden lg:flex"
          >
            {/* Center Content */}
            <div className="absolute z-20 text-center">
               <h3 className="text-5xl font-bold mb-2">500+</h3>
               <p className="text-muted-foreground">Daily Deals</p>
            </div>

            {/* Orbit Rings */}
            <div className="absolute border border-white/5 rounded-full w-[300px] h-[300px]" />
            <div className="absolute border border-white/5 rounded-full w-[450px] h-[450px]" />
            <div className="absolute border border-white/5 rounded-full w-[600px] h-[600px]" />

            {/* Orbiting Elements - Ring 1 */}
            <div className="absolute w-[300px] h-[300px] animate-spin [animation-duration:20s]">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="h-12 w-12 rounded-2xl bg-primary/20 backdrop-blur-md border border-primary/50 flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(var(--primary),0.5)]">
                    ✈️
                  </div>
               </div>
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <div className="h-10 w-10 rounded-full bg-secondary/20 backdrop-blur-md border border-secondary/50 flex items-center justify-center">
                    <Avatar className="h-full w-full">
                        <AvatarImage src="https://i.pravatar.cc/100?img=33" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>
               </div>
            </div>

            {/* Orbiting Elements - Ring 2 */}
            <div className="absolute w-[450px] h-[450px] animate-spin [animation-duration:35s] [animation-direction:reverse]">
               <div className="absolute top-1/4 left-0 -translate-x-1/2">
                  <div className="h-14 w-14 rounded-2xl bg-blue-500/20 backdrop-blur-md border border-blue-500/50 flex items-center justify-center text-2xl">
                    🌍
                  </div>
               </div>
               <div className="absolute bottom-1/4 right-0 translate-x-1/2">
                  <div className="h-12 w-12 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-500/50 flex items-center justify-center overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=100&q=80" alt="Plane" className="h-full w-full object-cover" />
                  </div>
               </div>
            </div>

             {/* Orbiting Elements - Ring 3 */}
             <div className="absolute w-[600px] h-[600px] animate-spin [animation-duration:50s]">
               <div className="absolute top-1/2 right-0 translate-x-1/2">
                  <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium">
                    JFK ↔ PAR $340
                  </div>
               </div>
               <div className="absolute bottom-0 left-1/4 translate-y-1/2">
                  <div className="h-16 w-16 rounded-2xl bg-pink-500/20 backdrop-blur-md border border-pink-500/50 flex items-center justify-center text-3xl">
                    🏖️
                  </div>
               </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Deals Section */}
      <section id="deals" className="relative py-20 px-4 bg-black/20 backdrop-blur-sm">
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
                  className="h-96 rounded-2xl bg-white/5 animate-pulse"
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
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center hover:bg-white/10 transition-colors"
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
      <footer className="relative py-12 px-4 border-t border-white/10">
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