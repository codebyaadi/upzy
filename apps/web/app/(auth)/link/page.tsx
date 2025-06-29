"use client";

import { useEmailStore } from "@/lib/stores/email-store";
import Link from "next/link";

export default function VerifyEmailPage() {
  const email = useEmailStore((state) => state.email);

  return (
    <section className="w-full max-w-md">
      <header className="mb-6 text-center">
        <h1 className="font-outfit pb-2 text-2xl">Check your inbox</h1>
        {email && (
          <p className="text-muted-foreground text-sm">
            We've sent you a magic link to <strong>{email}</strong>.
            <br />
            Please click the link to confirm your address.
          </p>
        )}
      </header>
      {/* Added the new text at the very bottom, in a smaller font */}
      <div className="text-muted-foreground mt-8 text-center text-xs">
        <p>
          Can't see the email? Please check your spam folder.
          <br />
          Wrong email?{" "}
          <Link href="/signup" className="text-white">
            Please re-enter your address.
          </Link>
        </p>
      </div>
    </section>
  );
}
