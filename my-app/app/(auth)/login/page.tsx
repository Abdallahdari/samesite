import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "../ui/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Sample login page",
};

export default function LoginPage() {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">Welcome back</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Sign in to continue. This is a sample form using Server Actions.
          </p>
        </div>
        <Link className="text-sm font-medium text-zinc-700 underline underline-offset-4" href="/">
          Home
        </Link>
      </div>

      <LoginForm />

      <div className="mt-6 rounded-xl border border-black/10 bg-zinc-50 p-4 text-xs text-zinc-700">
        Demo: enter any valid email + a password with 6+ characters.
      </div>
    </div>
  );
}
