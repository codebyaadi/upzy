import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/drizzle.ts", "src/redis.ts", "src/schema/*.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  target: "node18",
});
