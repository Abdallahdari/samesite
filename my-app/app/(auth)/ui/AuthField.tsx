import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function AuthField({ label, id, ...props }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-900" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="h-11 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-900"
        {...props}
      />
    </div>
  );
}
