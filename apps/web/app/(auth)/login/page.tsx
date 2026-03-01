"use client";

import { ArrowRight01Icon, Shield01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { authClient } from "@upzy/auth/client";
import { Button } from "@upzy/ui/components/button";
import { Card, CardContent } from "@upzy/ui/components/card";
import { Input } from "@upzy/ui/components/input";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
      },
      {
        onResponse: () => setLoading(false),
        onError: (ctx) => alert(ctx.error.message),
      },
    );
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={Shield01Icon} size={14} className="text-primary" />
          <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase italic">
            // OPERATOR_LOGIN
          </span>
        </div>
        <h2 className="text-4xl font-black tracking-tighter uppercase italic">Initiate Session</h2>
      </div>

      <Card className="relative overflow-hidden rounded-none border-2 border-zinc-800/80 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="via-primary absolute top-0 left-0 h-1 w-full animate-pulse bg-linear-to-r from-transparent to-transparent" />

        <CardContent className="space-y-6 p-8">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="pl-1 text-[9px] font-black tracking-[0.2em] text-zinc-500 uppercase">
                Operator_Email
              </label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ID_7721@UPZY.SEC"
                className="focus-visible:ring-primary/50 h-14 rounded-none border-zinc-800 bg-zinc-900/40 font-mono text-xs italic transition-all placeholder:text-zinc-700"
              />
            </div>
            <div className="space-y-1">
              <label className="pl-1 text-[9px] font-black tracking-[0.2em] text-zinc-500 uppercase">
                Access_Key
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="focus-visible:ring-primary/50 h-14 rounded-none border-zinc-800 bg-zinc-900/40 font-mono text-xs transition-all placeholder:text-zinc-700"
              />
            </div>
          </div>

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="bg-primary h-14 w-full gap-2 rounded-none text-sm font-black text-white uppercase italic transition-all hover:bg-white hover:text-black"
          >
            {loading ? "VALIDATING..." : "Establish Connection"}
            <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
          </Button>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
          New Node?{" "}
          <Link
            href="/signup"
            className="text-primary underline underline-offset-4 transition-colors hover:text-white"
          >
            Request_Access
          </Link>
        </p>
      </div>
    </div>
  );
}
