"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import AuthField from "./AuthField";
import AuthSubmit from "./AuthSubmit";

type Json = Record<string, unknown> | null;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(
    () => {
      const raw = searchParams.get("next");
      if (!raw) return "/";
      if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
      return raw;
    },
    [searchParams]
  );
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

    const res = await fetch(`${backendUrl}/api/users/login`, {
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
          : null) || "Login failed.";
      setError(message);
      return;
    }

    router.push(nextPath);
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
        autoComplete="current-password"
        required
      />

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <AuthSubmit pending={pending}>Login</AuthSubmit>

      <Link className="text-sm text-zinc-600 underline" href="/register">
        Need an account?
      </Link>
    </form>
  );
}
