'use client'

type Props = {
  id: string;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  required?: boolean;
};

export function AuthField({
  id,
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  error,
  required,
}: Props) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-zinc-900">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:ring-2 ${
          error
            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
            : "border-black/10 focus:border-blue-400 focus:ring-blue-200"
        }`}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-rose-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
