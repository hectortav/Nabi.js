import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
// @ts-ignore
import { dependencies } from "./package.json";

const renderChunks = (deps: Record<string, string>) => {
    let chunks = {};
    Object.keys(deps).forEach((key) => {
        if (["react", "react-dom"].includes(key)) return;
        chunks[key] = [key];
    });
    return chunks;
};

export default defineConfig({
    plugins: [react(), viteTsconfigPaths(), splitVendorChunkPlugin()],
    build: {
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom"],
                    ...renderChunks(dependencies),
                },
            },
        },
    },
});
