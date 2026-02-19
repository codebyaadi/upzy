import {
  Shield01Icon,
  ActivityIcon,
  RadarIcon,
  TargetIcon,
  Coordinate01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge } from "@upzy/ui/components/badge";
import { Button } from "@upzy/ui/components/button";
import { Card, CardContent } from "@upzy/ui/components/card";
import { Input } from "@upzy/ui/components/input";

export default function Home() {
  return (
    <div className="dark selection:bg-primary/30 min-h-screen overflow-x-hidden bg-[#050505] font-mono text-zinc-100">
      {/* CYBERNETIC OVERLAYS */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Subtle Grid - Fixed bg-size syntax */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px]" />

        {/* Top Glow Accent */}
        <div className="bg-primary/10 absolute top-0 left-1/2 h-96 w-full max-w-4xl -translate-x-1/2 rounded-full opacity-40 blur-[120px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-12 pb-24">
        {/* TOP HUD BAR */}
        <nav className="mb-20 flex items-center justify-between border-b border-zinc-800/40 pb-6">
          <div className="flex items-center gap-3">
            <div className="border-primary/50 bg-primary/5 flex size-9 items-center justify-center border shadow-[0_0_20px_rgba(var(--color-primary),0.1)]">
              <HugeiconsIcon icon={RadarIcon} size={18} className="text-primary animate-pulse" />
            </div>
            <div className="leading-none">
              <h2 className="text-xs font-black tracking-widest uppercase italic">Upzy_Systems</h2>
              <span className="text-[9px] tracking-tighter text-zinc-600 uppercase">
                Node_Status: 04.26_Online
              </span>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase md:flex">
            <div className="flex items-center gap-2">
              <span className="size-1.5 animate-ping rounded-full bg-emerald-500" />
              <span className="text-emerald-500/80">Link_Stable</span>
            </div>
            <div className="h-4 w-px bg-zinc-800" />
            <span>Ref: 47.37 // 8.54</span>
          </div>
        </nav>

        {/* HERO SECTION */}
        <div className="mb-32 grid items-center gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/5 text-primary rounded-none px-4 py-1 text-[10px] font-bold tracking-widest italic"
            >
              // INITIATING_ACCESS_PROTOCOL_V.2
            </Badge>

            <h1 className="text-6xl leading-[0.85] font-black tracking-tighter uppercase italic md:text-8xl">
              Automated <br />
              <span className="to-primary/80 bg-linear-to-r from-white via-white bg-clip-text text-transparent">
                Asset Recon.
              </span>
            </h1>

            <p className="border-primary/20 max-w-xl border-l-2 pl-6 font-sans text-sm leading-relaxed text-zinc-400 md:text-base">
              Upzy continuously maps your attack surface using autonomous discovery patterns. Deploy
              multi-region uptime monitoring without touching a config file.
              <span className="decoration-primary mt-3 block font-mono text-xs font-bold tracking-widest text-zinc-200 uppercase underline underline-offset-4">
                Zero Configuration. Full Visibility.
              </span>
            </p>

            {/* Tactical Waitlist Form */}
            <div className="flex max-w-md flex-col gap-0 pt-6 sm:flex-row">
              <div className="group relative flex-1">
                <Input
                  placeholder="OPERATOR_EMAIL"
                  className="focus-visible:ring-primary/50 h-14 rounded-none border-zinc-800 bg-zinc-900/40 font-mono text-xs transition-all group-hover:bg-zinc-900/60 placeholder:text-zinc-700 focus-visible:ring-1"
                />
              </div>
              <Button className="bg-primary h-14 gap-2 rounded-none px-10 text-sm font-black text-white uppercase italic transition-all hover:bg-white hover:text-black">
                Join Waitlist
                <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
              </Button>
            </div>
          </div>

          {/* RIGHT SIDE HUD DECORATION */}
          <div className="hidden opacity-40 lg:col-span-5 lg:block">
            <div className="relative mx-auto size-64">
              <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border-[0.5px] border-zinc-800" />
              <div className="absolute inset-4 animate-[spin_15s_linear_infinite_reverse] rounded-full border-[0.5px] border-zinc-800/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <HugeiconsIcon icon={TargetIcon} size={48} className="text-primary/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="group relative">
          <div className="bg-primary/10 absolute -inset-1 opacity-0 blur-xl transition duration-1000 group-hover:opacity-100" />

          <Card className="relative overflow-hidden rounded-none border-2 border-zinc-800/80 bg-[#0a0a0a]/90 backdrop-blur-md">
            {/* Top scanning line decoration */}
            <div className="via-primary absolute top-0 left-0 h-1 w-full animate-pulse bg-linear-to-r from-transparent to-transparent" />

            <CardContent className="p-0">
              <div className="grid divide-y divide-zinc-800/60 md:grid-cols-2 md:divide-x-2 md:divide-y-0">
                {/* DISCOVERY STREAM */}
                <div className="space-y-6 p-8">
                  <div className="flex items-center justify-between border-b border-zinc-800/50 pb-4">
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon icon={Coordinate01Icon} size={14} className="text-primary" />
                      <h4 className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">
                        Discovery_Stream
                      </h4>
                    </div>
                    <span className="border border-zinc-800 px-2 py-0.5 text-[9px] text-zinc-500">
                      RECURSIVE_MODE
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { host: "api.upzy.io", status: "STABLE", color: "text-emerald-500" },
                      { host: "cluster-01.internal", status: "MAPPED", color: "text-blue-500" },
                      { host: "staging-v2.upzy.io", status: "NEW_ASSET", color: "text-primary" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border border-zinc-800/30 bg-black/40 p-3 text-[11px] transition-colors hover:bg-zinc-900/50"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-zinc-700">0{i + 1}</span>
                          <span className="font-medium tracking-tight text-zinc-300">
                            {item.host}
                          </span>
                        </div>
                        <span className={`font-black ${item.color} text-[9px] tracking-tighter`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* HEALTH MATRIX */}
                <div className="bg-primary/1 space-y-6 p-8">
                  <div className="flex items-center justify-between border-b border-zinc-800/50 pb-4">
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon icon={ActivityIcon} size={14} className="text-emerald-500" />
                      <h4 className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">
                        Health_Matrix
                      </h4>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="size-1 bg-emerald-500/40" />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="group/metric relative border border-emerald-500/20 bg-emerald-500/5 p-4 transition-all hover:bg-emerald-500/10">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-[10px] font-black tracking-widest text-emerald-500 uppercase italic">
                          Global Node: Nominal
                        </p>
                        <span className="text-[10px] font-bold tracking-tighter text-emerald-500/50">
                          LAT: 24ms
                        </span>
                      </div>
                      <div className="flex h-10 items-end gap-1">
                        {[40, 70, 45, 90, 65, 80, 55, 75, 40, 60, 50, 85].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-emerald-500/20 transition-all duration-500 group-hover/metric:bg-emerald-500/60"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="bg-primary/5 border-primary/20 flex items-center justify-between border p-4">
                      <div className="space-y-1">
                        <p className="text-primary text-[10px] font-black tracking-widest uppercase">
                          Security_Alert
                        </p>
                        <p className="max-w-50 font-sans text-[10px] text-zinc-500 italic">
                          SSL Certificate expiration detected on node 0x44.
                        </p>
                      </div>
                      <HugeiconsIcon
                        icon={Shield01Icon}
                        size={18}
                        className="text-primary animate-pulse"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Footer HUD */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-y-4 text-[9px] font-black tracking-[0.3em] text-zinc-600 uppercase">
            <div className="flex gap-6">
              <span>Sys_Kernel: 0x889F2</span>
              <span className="hidden sm:inline">Thread_Load: 14.2%</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Active_Scan_Duration: 1,244:09:12</span>
              <div className="h-1 w-24 overflow-hidden bg-zinc-900">
                <div className="bg-primary/40 h-full w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
