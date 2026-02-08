"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircleIcon, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

import { Button } from "@upzy/ui/components/button";
import { Input } from "@upzy/ui/components/input";
import { Alert, AlertDescription, AlertTitle } from "@upzy/ui/components/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@upzy/ui/components/form";
import { authClient } from "@upzy/auth/client";
import { useEmailStore } from "@/lib/stores/email-store";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function SignUp() {
  const router = useRouter();
  const setEmailStore = useEmailStore((state) => state.setEmail);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setErrorMessage("");

    try {
      const { error } = await authClient.signIn.magicLink({
        email: values.email,
        callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/onboard`,
      });

      if (error) {
        setErrorMessage(
          error.message || "Failed to send magic link. Please try again.",
        );
        return;
      }

      setEmailStore(values.email);

      // ✅ Redirect to verify email page
      router.push("/link");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong.");
      }
    }
  }

  return (
    <section className="w-full max-w-sm">
      <Form {...form}>
        <header className="mb-6 text-center">
          <h1 className="font-outfit pb-2 text-2xl">
            Create your free account
          </h1>
          <p className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </p>
        </header>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="text-xs">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" className="py-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Generate magic link"
            )}
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
      </Form>
    </section>
  );
}
