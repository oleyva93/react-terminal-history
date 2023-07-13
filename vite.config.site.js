import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { reactVirtualized } from "./react-virtualized-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactVirtualized()],
});
