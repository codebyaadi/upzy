import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/*.ts", "./src/emails/*.tsx"],
  dts: true,
  clean: true,
});
