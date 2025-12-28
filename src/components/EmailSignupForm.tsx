import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export function EmailSignupForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const addEmailSignup = useMutation(api.emailSignups.addEmailSignup);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const result = await addEmailSignup({ email });
      if (result.success) {
        toast.success("Welcome aboard! 🎉", {
          description: "Check your inbox for exclusive deals.",
        });
        setEmail("");
      } else {
        toast.error("Oops!", {
          description: result.message,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold tracking-tight mb-2">
          Unlock Custom Routes ✈️
        </h3>
        <p className="text-muted-foreground mb-6">
          Loving these deals? Get personalized routes (NYC to Bali, anyone?) for just $2.99. 
          Sign up free to get started!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9 bg-white/20 backdrop-blur-sm border-white/30"
              disabled={isLoading}
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="whitespace-nowrap"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing up...
              </>
            ) : (
              "Get Free Access"
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground mt-4">
          We earn a small commission at no extra cost to you. Your support keeps FlightIQ free! 🙏
        </p>
      </div>
    </motion.div>
  );
}
