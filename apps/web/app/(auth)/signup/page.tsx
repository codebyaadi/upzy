"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

import { authClient } from "@upzy/auth/client";
import { Button } from "@upzy/ui/components/button";
import { Input } from "@upzy/ui/components/input";
import { Alert, AlertDescription, AlertTitle } from "@upzy/ui/components/alert";
import { useEmailStore } from "@/lib/stores/email-store";

export default function SignUp() {
  const router = useRouter();
  const setEmailStore = useEmailStore((state) => state.setEmail);

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const { error } = await authClient.signIn.magicLink({
        email,
        callbackURL: "/dashboard",
      });

      if (error) {
        setErrorMessage(
          error.message || "Failed to send magic link. Please try again."
        );
        return;
      }

      setEmailStore(email);

      // ✅ Redirect to verify email page
      router.push("/link");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full max-w-sm">
      <header className="mb-6 text-center">
        <h1 className="font-outfit pb-2 text-2xl">Create your free account</h1>
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </header>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {errorMessage && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="text-xs">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}
        <Input
          type="email"
          placeholder="Email"
          className="w-full py-5 text-xs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Generate magic link"}
        </Button>
      </form>

      <p className="text-muted-foreground mt-4 text-center text-xs font-medium">
        By signing up, you agree to the{" "}
        <Link href="/terms" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </section>
  );
}
