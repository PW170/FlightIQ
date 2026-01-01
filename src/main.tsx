import { Toaster } from "@/components/ui/sonner";
import { InstrumentationProvider } from "@/instrumentation.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import "./index.css";
import "./types/global.d.ts";
import Landing from "./pages/Landing.tsx";
import { DashboardLayout } from "./layouts/DashboardLayout";

// Lazy load other route components
const AuthPage = lazy(() => import("./pages/Auth.tsx"));
const Pricing = lazy(() => import("./pages/Pricing.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const Settings = lazy(() => import("./pages/dashboard/Settings.tsx"));
const Alerts = lazy(() => import("./pages/dashboard/Alerts.tsx"));
const History = lazy(() => import("./pages/dashboard/History.tsx"));

// Placeholders for now
const Explore = () => <div className="p-10 text-center"><h2 className="text-2xl font-bold">Explore Functionality Coming Soon</h2></div>;
const Trips = () => <div className="p-10 text-center"><h2 className="text-2xl font-bold">My Trips Coming Soon</h2></div>;

const AdminLogin = lazy(() => import("./pages/AdminLogin.tsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Simple loading fallback for route transitions
function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse text-muted-foreground flex flex-col items-center gap-4">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    </div>
  );
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string, {
  skipConvexDeploymentUrlCheck: true,
});

function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}

function DashboardWrapper({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InstrumentationProvider>
      <ConvexAuthProvider client={convex}>
        <BrowserRouter>
          <RouteSyncer />
          <Suspense fallback={<RouteLoading />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<AuthPage redirectAfterAuth="/dashboard" />} />
              <Route path="/pricing" element={<Pricing />} />

              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              <Route path="/dashboard/alerts" element={<Alerts />} />
              <Route path="/dashboard/history" element={<History />} />
              <Route path="/dashboard/explore" element={<DashboardWrapper><Explore /></DashboardWrapper>} />
              <Route path="/dashboard/trips" element={<DashboardWrapper><Trips /></DashboardWrapper>} />

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster />
      </ConvexAuthProvider>
    </InstrumentationProvider>
  </StrictMode>,
);
