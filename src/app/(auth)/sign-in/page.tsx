"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LayoutDashboard,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type SignInFormValues, signInSchema } from "@/schemas/auth";
import { useAuthStore } from "@/stores/auth";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [login, isAuthenticated] = useAuthStore(
    useShallow((state) => [state.login, state.isAuthenticated])
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInFormValues) {
    try {
      setIsLoading(true);
      const success = login(data.email, data.password);
      if (success) {
        toast.success("Signed in successfully");
        // router.push("/");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo & Heading */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="mb-6 flex items-center gap-2.5">
            <div className="bg-primary shadow-primary/25 flex h-10 w-10 items-center justify-center rounded-xl shadow-lg">
              <LayoutDashboard className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="text-foreground text-xl font-bold tracking-tight">
              POS System
            </span>
          </Link>
          <h1 className="text-foreground text-2xl font-bold tracking-tight">
            Welcome back
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm">
            Sign in to your account to continue
          </p>
        </div>

        <Card className="border-border/60 shadow-xl shadow-black/5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="flex flex-col gap-4 pt-2">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={
                    errors.email
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-destructive text-xs">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="text-primary hover:text-primary/80 text-xs font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={
                      errors.password
                        ? "border-destructive focus-visible:ring-destructive pr-10"
                        : "pr-10"
                    }
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-destructive text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className="mt-4 flex flex-col gap-4">
              <Button
                type="submit"
                className="h-11 w-full gap-2 text-sm font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-muted-foreground text-center text-sm">
                {"Don't have an account? "}
                <Link
                  href="/sign-up"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Create one
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        <p className="text-muted-foreground mt-6 text-center text-xs">
          By signing in, you agree to our{" "}
          <Link
            href="#"
            className="hover:text-foreground underline underline-offset-4 transition-colors"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="hover:text-foreground underline underline-offset-4 transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
