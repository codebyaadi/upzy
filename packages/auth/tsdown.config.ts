import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/client.ts", "src/server.ts", "src/types.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  target: "node18",
});
