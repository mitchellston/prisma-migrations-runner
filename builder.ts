import dts from "bun-plugin-dts";
import fs from "fs/promises";

await fs.rmdir("./dist", { recursive: true });

await Bun.build({
  entrypoints: ["./src/index.ts", "./src/mysql/index.ts"],
  outdir: "./dist",
  target: "node",
  splitting: true,
  minify: true,
  sourcemap: "external",
  plugins: [dts()],
});
