'use client'

import Link from "next/link";
import { useActionState } from "react";
import { login, type AuthActionState } from "../actions";
import { AuthField } from "./AuthField";
import { AuthSubmit } from "./AuthSubmit";

const initialState: AuthActionState = { ok: false, message: "" };

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <AuthField
        id="email"
        label="Email"
        name="email"
        type="email"
        placeholder="demo@site.com"
        autoComplete="email"
        required
        error={state.fieldErrors?.email}
      />
      <AuthField
        id="password"
        label="Password"
        name="password"
        type="password"
        placeholder="Your password"
        autoComplete="current-password"
        required
        error={state.fieldErrors?.password}
      />

      <div className="flex items-center justify-between">
        <label className="inline-flex items-center gap-2 text-sm text-zinc-700">
          <input
            name="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-black/20"
          />
          Remember me
        </label>
        <span className="text-sm text-zinc-500">Forgot password? (sample)</span>
      </div>

      <p aria-live="polite" className={`text-sm ${state.ok ? "text-emerald-700" : "text-zinc-600"}`}>
        {state.message}
      </p>

      <AuthSubmit label="Sign in" />

      <p className="pt-2 text-sm text-zinc-700">
        New here?{" "}
        <Link className="font-semibold text-zinc-900 underline underline-offset-4" href="/register">
          Create an account
        </Link>
      </p>
    </form>
  );
}
