import "@/styles/globals.css";
import { Toaster } from "@upzy/ui/components/sonner";
import { Providers } from "@/components/providers";
import { fontInter, fontOutfit } from "./fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontOutfit.variable} ${fontInter.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
