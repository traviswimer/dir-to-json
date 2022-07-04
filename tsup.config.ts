import { defineConfig } from "tsup";

export default defineConfig({
	format: ["esm", "cjs"],
	entry: ["src/main.ts", "src/callback.ts"],
	splitting: false,
	sourcemap: true,
	clean: true,
	dts: true,
});
