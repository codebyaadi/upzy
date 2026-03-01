import { RadarIcon, TargetIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge } from "@upzy/ui/components/badge";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark selection:bg-primary/30 relative flex min-h-screen overflow-hidden bg-[#050505] font-mono text-zinc-100">
      {/* CYBERNETIC OVERLAYS */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="bg-primary/10 absolute top-0 left-1/2 h-96 w-full max-w-4xl -translate-x-1/2 rounded-full opacity-40 blur-[120px]" />
      </div>

      {/* LEFT BRANDING PANEL */}
      <div className="relative z-10 hidden flex-1 flex-col justify-between border-r border-zinc-800/40 p-12 lg:flex">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="border-primary/50 bg-primary/5 flex size-9 items-center justify-center border shadow-[0_0_20px_rgba(var(--color-primary),0.1)]">
              <HugeiconsIcon icon={RadarIcon} size={18} className="text-primary animate-pulse" />
            </div>
            <div className="leading-none">
              <h2 className="text-xs font-black tracking-widest uppercase italic">Upzy_Systems</h2>
              <span className="text-[9px] tracking-tighter text-zinc-600 uppercase">
                Node_Status: AUTH_GATEWAY
              </span>
            </div>
          </div>
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/5 text-primary rounded-none px-4 py-1 text-[10px] font-bold tracking-widest italic"
          >
            // SECURE_LINK_ESTABLISHED
          </Badge>
        </div>

        <div className="relative">
          <h1 className="text-8xl leading-[0.85] font-black tracking-tighter uppercase italic">
            Access <br />
            <span className="text-primary/80">Control.</span>
          </h1>
          <p className="border-primary/20 mt-8 max-w-sm border-l-2 pl-6 font-sans text-sm leading-relaxed text-zinc-400">
            Authenticate into the monitoring grid. Deploying autonomous discovery patterns requires
            operator clearance.
          </p>
        </div>

        {/* HUD DECORATION */}
        <div className="relative size-32 opacity-20">
          <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border-[0.5px] border-zinc-800" />
          <div className="absolute inset-0 flex items-center justify-center">
            <HugeiconsIcon icon={TargetIcon} size={32} className="text-primary" />
          </div>
        </div>
      </div>

      {/* RIGHT AUTH FORM PANEL */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">{children}</div>
        <div className="absolute bottom-8 text-[9px] font-black tracking-[0.3em] text-zinc-700 uppercase">
          Sys_Kernel: 0x889F2 // Auth_Protocol_v.1.02
        </div>
      </main>
    </div>
  );
}
