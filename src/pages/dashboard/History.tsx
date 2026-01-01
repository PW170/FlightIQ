import { DashboardLayout } from "@/layouts/DashboardLayout";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { History as HistoryIcon, MapPin, Plane, Clock, Calendar, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export default function History() {
    const history = useQuery(api.flights.getFlightHistory);

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <HistoryIcon className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight italic">My Flight History</h1>
                        <p className="text-muted-foreground">The flights you've explored recently.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {history === undefined ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="h-32 rounded-2xl bg-white/5 animate-pulse border border-white/10" />
                        ))
                    ) : history.length === 0 ? (
                        <div className="text-center py-20 rounded-2xl border border-dashed border-white/10 bg-white/5">
                            <HistoryIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-50" />
                            <h3 className="text-xl font-semibold mb-2">No history yet</h3>
                            <p className="text-muted-foreground">Flights you explore will appear here.</p>
                        </div>
                    ) : (
                        history.map((entry) => {
                            if (!entry.flight) return null;
                            return (
                                <div key={entry._id} className="group relative rounded-2xl border border-white/5 bg-zinc-900/50 p-6 transition-all hover:bg-zinc-900/80 hover:border-white/10">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground uppercase tracking-widest">
                                                    Viewed {format(entry.timestamp, "MMM d, h:mm a")}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="text-2xl font-bold">{entry.flight.route}</div>
                                                <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold">
                                                    ${entry.flight.price}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-6 mt-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-primary/60" />
                                                    {entry.flight.origin} → {entry.flight.destination}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Plane className="h-4 w-4 text-primary/60" />
                                                    {entry.flight.airline}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-primary/60" />
                                                    {entry.flight.outboundDuration}
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            className="rounded-full border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all group-hover:scale-105"
                                            onClick={() => window.open(entry.flight!.bookingUrl, "_blank")}
                                        >
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Revisit Deal
                                        </Button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
