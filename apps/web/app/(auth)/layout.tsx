import { UpzyLogo } from "@upzy/ui/components/upzy-logo";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-inter flex min-h-screen flex-col justify-between">
      <main className="flex flex-grow flex-col items-center justify-center px-4 sm:px-6">
        <UpzyLogo scale={2} className="mb-8" />
        {children}
      </main>
      <footer className="text-muted-foreground py-6 text-center text-xs font-medium">
        © 2025 Upzy., Inc. •{" "}
        <Link href="/privacy" className="hover:underline">
          Privacy
        </Link>{" "}
        •{" "}
        <Link href="/terms" className="hover:underline">
          Terms
        </Link>
      </footer>
    </div>
  );
}
