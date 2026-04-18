import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "../ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Login
        </h1>
        <p className="text-sm text-zinc-600">
          Welcome back. Use your email and password.
        </p>
      </header>

      <Suspense fallback={<div className="h-11" />}>
        <LoginForm />
      </Suspense>

      <p className="text-sm text-zinc-600">
        Don&apos;t have an account?{" "}
        <Link className="font-medium text-zinc-900 underline" href="/register">
          Register
        </Link>
      </p>
    </div>
  );
}
