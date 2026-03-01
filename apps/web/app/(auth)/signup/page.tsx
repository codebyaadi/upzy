"use client";

import { ArrowRight01Icon, Coordinate01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { authClient } from "@upzy/auth/client";
import { Button } from "@upzy/ui/components/button";
import { Card, CardContent } from "@upzy/ui/components/card";
import { Input } from "@upzy/ui/components/input";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await authClient.signUp.email(
      {
        email,
        password,
        name,
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
          <HugeiconsIcon icon={Coordinate01Icon} size={14} className="text-primary" />
          <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase italic">
            // NEW_NODE_REGISTRATION
          </span>
        </div>
        <h2 className="text-4xl font-black tracking-tighter uppercase italic">Request Access</h2>
      </div>

      <Card className="relative overflow-hidden rounded-none border-2 border-zinc-800/80 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="via-primary absolute top-0 left-0 h-1 w-full animate-pulse bg-linear-to-r from-transparent to-transparent" />

        <CardContent className="space-y-4 p-8">
          <div className="space-y-1">
            <label className="pl-1 text-[9px] font-black tracking-[0.2em] text-zinc-500 uppercase">
              Operator_Alias
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="COMMANDER_ZERO"
              className="focus-visible:ring-primary/50 h-12 rounded-none border-zinc-800 bg-zinc-900/40 font-mono text-xs italic"
            />
          </div>
          <div className="space-y-1">
            <label className="pl-1 text-[9px] font-black tracking-[0.2em] text-zinc-500 uppercase">
              Operator_Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="NODE@UPZY.SEC"
              className="focus-visible:ring-primary/50 h-12 rounded-none border-zinc-800 bg-zinc-900/40 font-mono text-xs italic"
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
              className="focus-visible:ring-primary/50 h-12 rounded-none border-zinc-800 bg-zinc-900/40 font-mono text-xs"
            />
          </div>

          <Button
            onClick={handleSignup}
            disabled={loading}
            className="bg-primary mt-4 h-14 w-full gap-2 rounded-none text-sm font-black text-white uppercase italic transition-all hover:bg-white hover:text-black"
          >
            {loading ? "REGISTERING..." : "Register Node"}
            <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
          </Button>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
          Already Authorized?{" "}
          <Link
            href="/login"
            className="text-primary underline underline-offset-4 transition-colors hover:text-white"
          >
            Initiate_Login
          </Link>
        </p>
      </div>
    </div>
  );
}
