import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "../ui/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Sample registration page",
};

export default function RegisterPage() {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">Create your account</h1>
          <p className="mt-1 text-sm text-zinc-600">
            A lightweight sample registration form (no persistence).
          </p>
        </div>
        <Link className="text-sm font-medium text-zinc-700 underline underline-offset-4" href="/">
          Home
        </Link>
      </div>

      <RegisterForm />
    </div>
  );
}
