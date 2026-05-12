"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AuthMode = "signin" | "signup";

type Props = {
  mode: AuthMode;
  oauthProviders: Array<"google" | "github">;
};

export function AuthForm({ mode, oauthProviders }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignup = mode === "signup";

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setError(null);
    setIsSubmitting(true);

    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch {
      setError("Unable to start the OAuth flow");
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (isSignup) {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

        const payload = (await response.json()) as { error?: string };

        if (!response.ok) {
          setError(payload.error ?? "Signup failed");
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      router.push(result?.url ?? "/dashboard");
      router.refresh();
    } catch {
      setError("Unable to reach the authentication service");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-amber-50/40 px-4 py-16 pt-28">
      <div className="mx-auto flex w-full max-w-md flex-col rounded-3xl border border-border bg-card/90 p-8 shadow-2xl shadow-amber-950/5 backdrop-blur">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold">
            T
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSignup
              ? "Start saving your solved problems and editorial notes."
              : "Sign in to continue your revision flow."}
          </p>
        </div>

        {oauthProviders.length > 0 && (
          <div className="space-y-3 mb-6">
            {oauthProviders.includes("google") && (
              <button
                type="button"
                onClick={() => handleOAuthSignIn("google")}
                disabled={isSubmitting}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 font-semibold text-foreground transition hover:border-primary hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Continue with Google
              </button>
            )}
            {oauthProviders.includes("github") && (
              <button
                type="button"
                onClick={() => handleOAuthSignIn("github")}
                disabled={isSubmitting}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 font-semibold text-foreground transition hover:border-primary hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Continue with GitHub
              </button>
            )}
            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                or
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">Name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          )}

          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">
              Password
            </span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder={
                isSignup ? "Create a secure password" : "Your password"
              }
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Please wait..."
              : isSignup
                ? "Create account"
                : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <Link
            href={isSignup ? "/signin" : "/signup"}
            className="font-semibold text-primary hover:underline"
          >
            {isSignup ? "Sign in" : "Create one"}
          </Link>
        </p>
      </div>
    </div>
  );
}
