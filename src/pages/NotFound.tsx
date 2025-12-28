import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-background text-foreground p-4 relative overflow-hidden">
       {/* Background Gradients */}
       <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-orange-200/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[0%] w-[60%] h-[60%] rounded-full bg-purple-900/20 blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center z-10 max-w-md mx-auto"
      >
        <h1 className="text-9xl font-bold text-primary/20">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The flight you're looking for has departed (or never existed). 
          Let's get you back on course.
        </p>
        <Button onClick={() => navigate("/")} size="lg" className="rounded-full">
          Return Home
        </Button>
      </motion.div>
    </div>
  );
}