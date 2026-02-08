import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/client.ts", "src/server.ts", "src/types.ts"],
  format: ["esm"],
  splitting: false,
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  target: "node18",
});
