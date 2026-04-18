"use client";

import type { ReactNode } from "react";

export default function AuthSubmit({
  pending,
  children,
}: {
  pending: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="h-11 rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
    >
      {pending ? "Please wait..." : children}
    </button>
  );
}
