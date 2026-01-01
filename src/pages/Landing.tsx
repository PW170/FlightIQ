import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Plane, ArrowRight, Lock, TrendingUp, Armchair, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { EmailSignupForm } from "@/components/EmailSignupForm";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen relative overflow-hidden text-foreground selection:bg-primary/20">

      {/* Subtle Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[10%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 min-h-[90dvh] flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Live Deals Active</span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60">
            TRAVEL <br className="hidden md:block" /> WITHOUT LIMITS
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            We curate the impossible. Premium flight deals providing luxury for the price of economy.
            <br className="hidden sm:block" /> Experience the world, unbroken.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full text-base font-semibold px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all hover:scale-105"
              onClick={() => {
                const howItWorksSection = document.getElementById("how-it-works");
                howItWorksSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Start Your Journey
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base font-medium px-8 h-12 border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all"
            >
              View Recent Deals
            </Button>
          </div>
        </motion.div>

        {/* Trusted By Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-32 w-full border-t border-white/5 pt-8"
        >
          <p className="text-xs text-center text-muted-foreground uppercase tracking-widest mb-6">Trusted by travelers from</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Simple Text Logos for Elegance */}
            <span className="text-xl font-bold font-serif">VOGUE</span>
            <span className="text-xl font-bold font-mono">WIRED</span>
            <span className="text-xl font-bold tracking-widest">EXPEDIA</span>
            <span className="text-xl font-bold italic">KAYAK</span>
          </div>
        </motion.div>
      </section>

      {/* Features Section - Bento Grid */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">The Farely Standard.</h2>
            <p className="text-xl text-muted-foreground max-w-xl">
              Precision engineered deal discovery. We don't just find flights; we architect journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Main Feature - Large */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 row-span-1 rounded-3xl border border-white/10 bg-card/50 backdrop-blur-xl p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp className="w-48 h-48" />
              </div>
              <div className="h-full flex flex-col justify-end relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-4 text-primary">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Algorithmic Pricing</h3>
                <p className="text-muted-foreground max-w-md">Our propriety engine scans 500+ sources hourly, locking in prices 40% below market average before the public sees them.</p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-1 rounded-3xl border border-white/10 bg-card/50 backdrop-blur-xl p-8 flex flex-col justify-between group"
            >
              <div className="h-12 w-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Armchair className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Comfort First</h3>
                <p className="text-muted-foreground">We filter out the misery. Minimum 30" legroom and top-tier carriers only.</p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-1 rounded-3xl border border-white/10 bg-card/50 backdrop-blur-xl p-8 flex flex-col justify-between"
            >
              <div className="h-12 w-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">No Layovers</h3>
                <p className="text-muted-foreground">Direct or single-stop optimized. Your time is the most valuable asset.</p>
              </div>
            </motion.div>

            {/* Feature 4 - Image/Graphic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-card/50 to-primary/5 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay hover:scale-105 transition-transform duration-700" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Join 20,000+ Travelers</h3>
                <div className="flex -space-x-4 justify-center py-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 w-12 rounded-full border-2 border-background bg-zinc-800 bg-cover bg-center" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})` }} />
                  ))}
                  <div className="h-12 w-12 rounded-full border-2 border-background bg-primary flex items-center justify-center text-xs font-bold">+20k</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="relative py-32 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Take Off?</h2>
          <p className="text-muted-foreground mb-12">Join our exclusive list. No spam, just world-class opportunities.</p>
          <EmailSignupForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/5 bg-black/20">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Plane className="h-4 w-4 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight">Farely</span>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2025 Farely Inc. Curated with <span className="text-primary">♥</span> in the Cloud.
          </p>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/login")}
            className="text-muted-foreground hover:text-foreground opacity-50 hover:opacity-100"
          >
            <Lock className="h-3 w-3 mr-2" /> Admin Access
          </Button>
        </div>
      </footer>
    </div>
  );
}
