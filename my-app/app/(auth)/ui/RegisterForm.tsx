'use client'

import Link from "next/link";
import { useActionState } from "react";
import { register, type AuthActionState } from "../actions";
import { AuthField } from "./AuthField";
import { AuthSubmit } from "./AuthSubmit";

const initialState: AuthActionState = { ok: false, message: "" };

export function RegisterForm() {
  const [state, formAction] = useActionState(register, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <AuthField
        id="name"
        label="Name"
        name="name"
        placeholder="Jane Doe"
        autoComplete="name"
        required
        error={state.fieldErrors?.name}
      />
      <AuthField
        id="email"
        label="Email"
        name="email"
        type="email"
        placeholder="jane@site.com"
        autoComplete="email"
        required
        error={state.fieldErrors?.email}
      />
      <AuthField
        id="password"
        label="Password"
        name="password"
        type="password"
        placeholder="At least 8 characters"
        autoComplete="new-password"
        required
        error={state.fieldErrors?.password}
      />
      <AuthField
        id="confirmPassword"
        label="Confirm password"
        name="confirmPassword"
        type="password"
        placeholder="Repeat your password"
        autoComplete="new-password"
        required
        error={state.fieldErrors?.confirmPassword}
      />

      <p aria-live="polite" className={`text-sm ${state.ok ? "text-emerald-700" : "text-zinc-600"}`}>
        {state.message}
      </p>

      <AuthSubmit label="Create account" />

      <p className="pt-2 text-sm text-zinc-700">
        Already have an account?{" "}
        <Link className="font-semibold text-zinc-900 underline underline-offset-4" href="/login">
          Sign in
        </Link>
      </p>
    </form>
  );
}
