"use client";
import { Button } from "@upzy/ui/components/button";
import { Input } from "@upzy/ui/components/input";
import Link from "next/link";

export default function LogIn() {
  return (
    <section className="font-inter w-full max-w-sm">
      <header className="mb-6 text-center">
        <h1 className="font-outfit pb-2 text-2xl">Log in to your account</h1>
        <p className="text-muted-foreground text-sm">
          Don’t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </header>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full py-5 text-sm"
            required
          />
        </div>

        <div>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full py-5 text-sm"
            required
          />
        </div>

        <Button type="submit" variant="default" size="lg" className="w-full">
          Log In
        </Button>
      </form>

      <Link
        href="/forget-pass"
        className="text-muted-foreground mt-4 block text-center text-xs font-medium"
      >
        Forgot your password ?
      </Link>
    </section>
  );
}
