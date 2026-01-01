import { DashboardLayout } from "@/layouts/DashboardLayout";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Bell, Check, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function Alerts() {
    const notifications = useQuery(api.notifications.getMyNotifications);
    const markAsRead = useMutation(api.notifications.markAsRead);
    const generateSample = useMutation(api.notifications.generateSampleNotification);

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Notifications & Alerts</h1>
                        <p className="text-muted-foreground">Stay updated on price drops and system messages.</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => generateSample()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Test Notification
                    </Button>
                </div>

                <div className="space-y-4">
                    {notifications === undefined ? (
                        // Loading
                        [1, 2, 3].map((i) => <div key={i} className="h-24 rounded-xl bg-card border border-white/5 animate-pulse" />)
                    ) : notifications.length === 0 ? (
                        // Empty
                        <div className="text-center py-20 bg-card rounded-xl border border-white/5 border-dashed">
                            <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-50" />
                            <p className="text-muted-foreground">No new notifications.</p>
                        </div>
                    ) : (
                        notifications.map((n) => (
                            <div
                                key={n._id}
                                className={`p-4 rounded-xl border flex items-start gap-4 transition-all ${n.isRead ? 'bg-card/50 border-white/5 opacity-70' : 'bg-card border-primary/20 shadow-[0_0_10px_rgba(var(--primary),0.05)]'}`}
                            >
                                <div className={`p-2 rounded-full mt-1 ${n.type === 'alert' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>
                                    {n.type === 'alert' ? <AlertCircle className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className={`font-semibold ${!n.isRead && 'text-foreground'}`}>{n.title}</h3>
                                        <span className="text-xs text-muted-foreground">{format(n.timestamp, "MMM d, h:mm a")}</span>
                                    </div>
                                    <p className="text-muted-foreground text-sm">{n.message}</p>
                                </div>
                                {!n.isRead && (
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                                        onClick={() => markAsRead({ notificationId: n._id })}
                                    >
                                        <Check className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
