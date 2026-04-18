'use server'

import { randomUUID } from 'node:crypto'
import { cookies } from 'next/headers'

type FieldErrors = Record<string, string>;

export type AuthActionState = {
  ok: boolean;
  message: string;
  fieldErrors?: FieldErrors;
};

async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isLikelyEmail(email: string) {
  // Lightweight check for a sample page (not RFC-complete).
  return /.+@.+\..+/.test(email);
}

export async function login(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  await sleep(450);

  const email = readText(formData, "email");
  const password = readText(formData, "password");

  const fieldErrors: FieldErrors = {};
  if (!isLikelyEmail(email)) fieldErrors.email = "Enter a valid email.";
  if (password.length < 6) fieldErrors.password = "Password must be at least 6 characters.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  await setAuthCookie(randomUUID());

  return {
    ok: true,
    message: `Sample login succeeded for ${email}. Cookie auth_token was set (HttpOnly).`,
  };
}

export async function register(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  await sleep(650);

  const name = readText(formData, "name");
  const email = readText(formData, "email");
  const password = readText(formData, "password");
  const confirmPassword = readText(formData, "confirmPassword");

  const fieldErrors: FieldErrors = {};
  if (name.length < 2) fieldErrors.name = "Enter your name.";
  if (!isLikelyEmail(email)) fieldErrors.email = "Enter a valid email.";
  if (password.length < 8) fieldErrors.password = "Password must be at least 8 characters.";
  if (confirmPassword !== password) {
    fieldErrors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  await setAuthCookie(randomUUID());

  return {
    ok: true,
    message: `Sample account created for ${name} (${email}). Cookie auth_token was set (HttpOnly).`,
  };
}
