import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  outDir: "dist",
  target: "esnext",
  minify: true,
});
