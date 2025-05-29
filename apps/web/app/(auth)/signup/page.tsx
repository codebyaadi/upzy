"use client";
import { Button } from "@upzy/ui/components/button";
import { Input } from "@upzy/ui/components/input";
import Link from "next/link";

export default function SignUp() {
  return (
    <section className="font-inter w-full max-w-sm">
      <header className="mb-6 text-center">
        <h1 className="font-outfit pb-2 text-2xl">Create your free account</h1>
        <p className="text-muted-foreground text-sm">
          Already have an account ?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </header>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Input
            type="email"
            placeholder="Email"
            className="w-full py-5 text-xs"
          />
        </div>
        <Button variant="default" size="lg" className="w-full">
          Sign Up
        </Button>
      </form>
      <p className="text-muted-foreground mt-4 text-center text-xs font-medium">
        By signing up, you agree to the{" "}
        <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </section>
  );
}
