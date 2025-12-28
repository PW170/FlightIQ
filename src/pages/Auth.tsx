import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useAuth } from "@/hooks/use-auth";
import { ArrowRight, Loader2, Mail, UserX } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface AuthProps {
  redirectAfterAuth?: string;
}

const AUTH_HIGHLIGHTS = [
  {
    title: "OTP login",
    description: "Codes arrive in seconds so you never miss a drop.",
  },
  {
    title: "Guest access",
    description: "Peek at IQ Picks without creating an account.",
  },
  {
    title: "Synced sessions",
    description: "Start on mobile, continue on desktop seamlessly.",
  },
];

function Auth({ redirectAfterAuth }: AuthProps = {}) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      const redirect = redirectAfterAuth || "/";
      navigate(redirect);
    }
  }, [authLoading, isAuthenticated, navigate, redirectAfterAuth]);
  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      setStep({ email: formData.get("email") as string });
      setIsLoading(false);
    } catch (error) {
      console.error("Email sign-in error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send verification code. Please try again.",
      );
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);

      console.log("signed in");

      const redirect = redirectAfterAuth || "/";
      navigate(redirect);
    } catch (error) {
      console.error("OTP verification error:", error);

      setError("The verification code you entered is incorrect.");
      setIsLoading(false);

      setOtp("");
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Attempting anonymous sign in...");
      await signIn("anonymous");
      console.log("Anonymous sign in successful");
      const redirect = redirectAfterAuth || "/";
      navigate(redirect);
    } catch (error) {
      console.error("Guest login error:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      setError(`Failed to sign in as guest: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] h-[65%] w-[65%] rounded-full bg-primary/15 blur-[140px]" />
        <div className="absolute top-[35%] right-[-15%] h-[60%] w-[60%] rounded-full bg-secondary/30 blur-[160px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/85 to-background/60" />
      </div>

      <div className="relative z-10 flex min-h-[100dvh] items-center">
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-12 lg:gap-16 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground lg:justify-start">
                Boarding Access
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                  Sign in anywhere, stay in the Daily Drops cockpit
                </h1>
                <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg lg:mx-0">
                  Glide through secure OTP login, jump in as a guest, and keep your deals synced across mobile, tablet, and desktop—always in our Dark Purple & Peach glassmorphism flow.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {AUTH_HIGHLIGHTS.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left shadow-lg shadow-black/10 backdrop-blur-xl"
                  >
                    <p className="text-sm font-semibold">{highlight.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full max-w-md mx-auto lg:mx-0">
              <Card className="w-full border-white/20 bg-card/80 backdrop-blur-2xl shadow-2xl">
                {step === "signIn" ? (
                  <>
                    <CardHeader className="space-y-2 text-center">
                      <div className="flex justify-center">
                        <img
                          src="./logo.svg"
                          alt="FlightIQ logo"
                          width={64}
                          height={64}
                          className="mt-4 rounded-lg cursor-pointer transition-opacity hover:opacity-80"
                          onClick={() => navigate("/")}
                        />
                      </div>
                      <CardTitle className="text-2xl">Get Started</CardTitle>
                      <CardDescription>Enter your email to log in or sign up</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleEmailSubmit}>
                      <CardContent className="space-y-6">
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <div className="relative flex-1">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              name="email"
                              placeholder="name@example.com"
                              type="email"
                              className="h-12 pl-9"
                              disabled={isLoading}
                              required
                            />
                          </div>
                          <Button
                            type="submit"
                            variant="outline"
                            className="h-12 w-full gap-2 rounded-full border-white/20 px-6 sm:w-auto"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Sending
                              </>
                            ) : (
                              <>
                                Send code
                                <ArrowRight className="h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                        {error && (
                          <p className="text-center text-sm text-red-500" role="alert">
                            {error}
                          </p>
                        )}
                        <div className="space-y-4">
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                              <span className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                              <span className="bg-card px-2 text-muted-foreground">Or</span>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            className="h-12 w-full rounded-full border-white/20"
                            onClick={handleGuestLogin}
                            disabled={isLoading}
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Continue as Guest
                          </Button>
                        </div>
                      </CardContent>
                    </form>
                  </>
                ) : (
                  <>
                    <CardHeader className="mt-4 space-y-2 text-center">
                      <CardTitle>Check your email</CardTitle>
                      <CardDescription>We've sent a code to {step.email}</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleOtpSubmit}>
                      <CardContent className="space-y-6">
                        <input type="hidden" name="email" value={step.email} />
                        <input type="hidden" name="code" value={otp} />
                        <div className="flex justify-center">
                          <InputOTP
                            value={otp}
                            onChange={setOtp}
                            maxLength={6}
                            disabled={isLoading}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && otp.length === 6 && !isLoading) {
                                const form = (e.target as HTMLElement).closest("form");
                                if (form) {
                                  form.requestSubmit();
                                }
                              }
                            }}
                          >
                            <InputOTPGroup>
                              {Array.from({ length: 6 }).map((_, index) => (
                                <InputOTPSlot key={index} index={index} />
                              ))}
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                        {error && (
                          <p className="text-center text-sm text-red-500" role="alert">
                            {error}
                          </p>
                        )}
                        <p className="text-center text-sm text-muted-foreground">
                          Didn't receive a code?{" "}
                          <Button variant="link" className="h-auto p-0" onClick={() => setStep("signIn")}>
                            Try again
                          </Button>
                        </p>
                      </CardContent>
                      <CardFooter className="flex-col gap-3">
                        <Button
                          type="submit"
                          className="h-12 w-full rounded-full"
                          disabled={isLoading || otp.length !== 6}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Verifying...
                            </>
                          ) : (
                            <>
                              Verify code
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setStep("signIn")}
                          disabled={isLoading}
                          className="w-full"
                        >
                          Use different email
                        </Button>
                      </CardFooter>
                    </form>
                  </>
                )}
                <div className="rounded-b-2xl border-t border-white/10 bg-muted/20 px-6 py-4 text-center text-xs text-muted-foreground">
                  Secured by{" "}
                  <a
                    href="https://vly.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline transition-colors hover:text-primary"
                  >
                    vly.ai
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage(props: AuthProps) {
  return (
    <Suspense>
      <Auth {...props} />
    </Suspense>
  );
}