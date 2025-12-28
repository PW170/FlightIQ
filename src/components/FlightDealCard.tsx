import { motion } from "framer-motion";
import { Plane, Clock, MapPin, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FlightDeal {
  _id: string;
  route: string;
  origin: string;
  destination: string;
  airline: string;
  price: number;
  outboundDuration: string;
  outboundStops: number;
  returnDuration: string;
  returnStops: number;
  departureDate: string;
  returnDate: string;
  priceScore: number;
  comfortScore: number;
  speedScore: number;
  notes: string;
  bookingUrl: string;
}

interface FlightDealCardProps {
  deal: FlightDeal;
  index: number;
}

export function FlightDealCard({ deal, index }: FlightDealCardProps) {
  const getScoreEmoji = (score: number) => {
    if (score >= 90) return "🔥";
    if (score >= 80) return "✨";
    return "👍";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Glassmorphism card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-1">{deal.route}</h3>
              <p className="text-sm text-muted-foreground">{deal.airline}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">${deal.price}</div>
              <p className="text-xs text-muted-foreground">Round Trip</p>
            </div>
          </div>

          {/* Route details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{deal.origin} → {deal.destination}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span>
                Out: {deal.outboundDuration} ({deal.outboundStops === 0 ? "Direct" : `${deal.outboundStops} stop${deal.outboundStops > 1 ? "s" : ""}`})
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Plane className="h-4 w-4 text-primary" />
              <span>
                Return: {deal.returnDuration} ({deal.returnStops === 0 ? "Direct" : `${deal.returnStops} stop${deal.returnStops > 1 ? "s" : ""}`})
              </span>
            </div>
          </div>

          {/* Dates */}
          <div className="flex items-center gap-2 mb-4 text-sm">
            <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm">
              {deal.departureDate} - {deal.returnDate}
            </Badge>
          </div>

          {/* IQ Scores */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <div className="text-xs text-muted-foreground mb-1">Price</div>
              <div className="font-bold">{getScoreEmoji(deal.priceScore)} {deal.priceScore}</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <div className="text-xs text-muted-foreground mb-1">Comfort</div>
              <div className="font-bold">🛋️ {deal.comfortScore}</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <div className="text-xs text-muted-foreground mb-1">Speed</div>
              <div className="font-bold">⚡ {deal.speedScore}</div>
            </div>
          </div>

          {/* Notes */}
          <p className="text-sm text-slate-300 mb-4 line-clamp-2">
            {deal.notes}
          </p>

          {/* CTA Button */}
          <Button
            className="w-full group/btn relative overflow-hidden"
            onClick={() => window.open(deal.bookingUrl, "_blank")}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Book Now & Save
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
