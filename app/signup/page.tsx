import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AuthForm } from "../_Components/auth/AuthForm";

export default async function SignUpPage() {
  const session = await auth();
  const oauthProviders = [
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? "google"
      : null,
    process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? "github"
      : null,
  ].filter(Boolean) as Array<"google" | "github">;

  if (session) {
    redirect("/dashboard");
  }

  return <AuthForm mode="signup" oauthProviders={oauthProviders} />;
}
