import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/client.ts", "src/server.ts"],
  format: ["esm", "cjs"],
  splitting: false,
  dts: false,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  target: "node18",
});
