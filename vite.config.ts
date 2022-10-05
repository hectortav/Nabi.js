import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import commonjs from "rollup-plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";

export default defineConfig({
    plugins: [
        react(),
        viteTsconfigPaths(),
        splitVendorChunkPlugin(),
        chunkSplitPlugin({
            strategy: "unbundle",
            customSplitting: {
                // `react` and `react-dom` will be bundled together in the `react-vendor` chunk (with their dependencies, such as object-assign)
                "react-vendor": ["react", "react-dom"],
                // Any file that includes `utils` in src dir will be bundled in the `utils` chunk
                utils: [/src\/utils/],
            },
        }),
    ],
    build: {
        sourcemap: false,
        rollupOptions: {
            plugins: [
                nodeResolve(),
                commonjs({
                    include: "node_modules/**",
                }),
                process.env.NODE_ENV === "production" &&
                    terser({
                        mangle: { reserved: ["svg"] },
                    }),
            ],
        },
    },
});
