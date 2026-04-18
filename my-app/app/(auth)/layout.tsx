import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center bg-[radial-gradient(1000px_600px_at_20%_15%,#dbeafe_0%,transparent_60%),radial-gradient(900px_500px_at_85%_85%,#ffe4e6_0%,transparent_55%),linear-gradient(to_bottom,#fafafa,#ffffff)] px-4 py-14">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-black/10 bg-white/80 p-7 shadow-[0_18px_60px_-32px_rgba(0,0,0,0.35)] backdrop-blur">
          {children}
        </div>
        <p className="mt-5 text-center text-xs text-zinc-500">
          Sample pages only. No database or real authentication.
        </p>
      </div>
    </div>
  );
}
