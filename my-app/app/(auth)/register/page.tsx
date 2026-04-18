import Link from "next/link";
import { RegisterForm } from "../ui/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Register
        </h1>
        <p className="text-sm text-zinc-600">Create an account to continue.</p>
      </header>

      <RegisterForm />

      <p className="text-sm text-zinc-600">
        Already have an account?{" "}
        <Link className="font-medium text-zinc-900 underline" href="/login">
          Login
        </Link>
      </p>
    </div>
  );
}
