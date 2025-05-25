import Navbar from "@/components/layouts/navigation/navbar";
import React from "react";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Navbar />
      {children}
    </div>
  );
}
