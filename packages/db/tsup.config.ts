import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src"],
  format: ["esm", "cjs"],
  splitting: false,
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  target: "node18",
});
