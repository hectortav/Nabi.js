import {
    readFileSync,
    writeFileSync,
    readdirSync,
    existsSync,
    mkdirSync,
} from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p: string) => path.resolve(__dirname, p);

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

const routesToPrerender = readdirSync(resolve("src/pages")).map(
    (file: string) => {
        const name = file.replace(/\.tsx$/, "").toLowerCase();
        return name === "index" ? `/` : `/${name}`;
    }
);

export async function generate(root = process.cwd()) {
    const resolve = (p: string) => path.resolve(__dirname, p);
    /**
     * @type {import('vite').ViteDevServer}
     */
    let vite: any;
    vite = await (
        await import("vite")
    ).createServer({
        root,
        logLevel: isTest ? "error" : "info",
        server: {
            middlewareMode: true,
            watch: {
                usePolling: true,
                interval: 100,
            },
            hmr: {
                port: 3000,
            },
        },
        appType: "custom",
    });

    const templateOriginal = readFileSync(resolve("index.html"), "utf-8");

    const render = (await vite.ssrLoadModule("/src/entry-server.tsx")).default;

    const dir = "dist/client";
    if (!existsSync(resolve(dir))) {
        mkdirSync(resolve(dir));
    }
    for (let url of routesToPrerender) {
        if (url.endsWith(".static")) {
            url = url.replace(/\.static$/, "");
            let template: any;
            template = templateOriginal;
            template = await vite.transformIndexHtml(url, template);

            const appHtml = render(url);
            const html = template.replace(`<!--ssr-outlet-->`, appHtml);

            const filePath = `${dir}${url === "/" ? "/index" : url}.html`;
            writeFileSync(resolve(filePath), html);
            console.log("generated:", filePath);
        }
    }
}

generate();
