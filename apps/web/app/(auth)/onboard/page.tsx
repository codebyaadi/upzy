"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircleIcon, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { generateSlug } from "@upzy/utils";

const formSchema = z.object({
  firstname: z.string().min(3, {
    message: "Firstname must be at least 3 characters.",
  }),
  lastname: z.string().min(3, {
    message: "Lastname must be at least 3 characters.",
  }),
  organization: z.string().min(3, {
    message: "Organization must be at least 3 characters.",
  }),
});

export default function Onboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      organization: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    setIsLoading(true);
    setErrorMessage("");

    try {
      await authClient.updateUser({
        name: `${values.firstname} ${values.lastname}`,
      });

      const slug = await generateSlug(values.organization);

      const { data, error } = await authClient.organization.create({
        name: values.organization,
        slug,
      });

      if (error) {
        throw new Error(error.message || "Failed to create organization");
      }

      if (data?.id) {
        await authClient.organization.setActive({ organizationId: data.id });
      }
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="w-full max-w-md">
      <Form {...form}>
        <header className="mb-6 text-center">
          <h1 className="font-outfit pb-2 text-2xl">Complete your profile</h1>
          <p className="text-muted-foreground text-sm">
            Just a few details to set up your account.
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
          <div className="flex flex-col justify-between gap-3 sm:flex-row">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/2">
                  <FormLabel className="sr-only">First name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First name"
                      className="py-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/2">
                  <FormLabel className="sr-only">Last name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last name"
                      className="py-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Organization name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Organization name"
                    className="py-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? <LoaderCircle className="animate-spin" /> : "Continue"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
