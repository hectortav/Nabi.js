import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), viteTsconfigPaths(), splitVendorChunkPlugin()],
    build: {
        sourcemap: false,
    },
});
