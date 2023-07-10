import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import * as packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin({ preRenderCSSCode: (cssCode) => cssCode }),
  ],
  build: {
    lib: {
      entry: resolve("lib", "index.js"),
      name: "ReactTerminalHistory",
      formats: ["es"],
      fileName: (format) => `react-terminal-history.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
});
