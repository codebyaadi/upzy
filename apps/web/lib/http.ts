import { HttpClient } from "@upzy/lib";

export const http = new HttpClient({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL!,
  credentials: "include",
});
