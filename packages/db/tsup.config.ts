import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/drizzle.ts", "src/redis.ts", "src/schema/*.ts"],
  format: ["esm"],
  splitting: false,
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  target: "node18",
});
