import { defineConfig } from "vite";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react-swc";
import * as packageJson from "./package.json";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin({ preRenderCSSCode: (cssCode) => cssCode }),
  ],
  build: {
    lib: {
      entry: resolve("lib", "index.jsx"),
      name: "ReactTerminalHistory",
      formats: ["es"],
      fileName: (format) => `react-terminal-history.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
});
