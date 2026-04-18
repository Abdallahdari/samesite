"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useTransition } from "react";
import AuthField from "./AuthField";
import AuthSubmit from "./AuthSubmit";

type Json = Record<string, unknown> | null;

export function RegisterForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      setError("Missing NEXT_PUBLIC_BACKEND_URL in env.");
      return;
    }

    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    setError(null);

    const res = await fetch(`${backendUrl}/api/users/register`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    let data: Json = null;
    try {
      data = (await res.json()) as Json;
    } catch {
      data = null;
    }

    if (!res.ok) {
      const message =
        (data && typeof data === "object" && typeof data.message === "string"
          ? data.message
          : null) || "Registration failed.";
      setError(message);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form
      action={(formData) => startTransition(() => onSubmit(formData))}
      className="flex flex-col gap-4"
    >
      <AuthField
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
      />
      <AuthField
        id="password"
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        required
      />

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <AuthSubmit pending={pending}>Create account</AuthSubmit>

      <Link className="text-sm text-zinc-600 underline" href="/login">
        Already registered?
      </Link>
    </form>
  );
}
