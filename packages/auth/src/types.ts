import type { createAuth } from "./server";

export type Auth = ReturnType<typeof createAuth>;

export type AuthSessionData = Awaited<ReturnType<Auth["api"]["getSession"]>>;

export type AuthUser = NonNullable<AuthSessionData>["user"];
export type AuthSession = NonNullable<AuthSessionData>["session"];
