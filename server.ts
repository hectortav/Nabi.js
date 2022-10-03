import { readFileSync } from "fs";
import * as path from "path";
import { Writable } from "stream";
import { fileURLToPath } from "url";
import express, { Request, Response } from "express";
import api from "./src/api/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

class HtmlWritable extends Writable {
    chunks: Buffer[] = [];
    html = "";

    getHtml() {
        return this.html;
    }

    _write(chunk: Buffer, encoding: string, callback: Function) {
        this.chunks.push(chunk);
        callback();
    }

    _final(callback: Function) {
        this.html = Buffer.concat(this.chunks).toString();
        callback();
    }
}

export async function createServer(
    root = process.cwd(),
    isProd = process.env.NODE_ENV === "production",
    hmrPort?: number
) {
    const resolve = (p: string) => path.resolve(__dirname, p);

    const indexProd = isProd
        ? readFileSync(resolve("client/index.html"), "utf-8")
        : "";

    const app = express();

    /**
     * @type {import('vite').ViteDevServer}
     */
    let vite: any;
    if (!isProd) {
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
                    port: hmrPort,
                },
            },
            appType: "custom",
        });
        app.use(vite.middlewares);
    } else {
        app.use((await import("compression")).default());
        app.use(
            (await import("serve-static")).default(resolve("client"), {
                index: false,
            })
        );
    }
    app.use("/api", api);

    app.use("*", async (req: Request, res: Response) => {
        try {
            const url = req.originalUrl;

            let template: any, render;
            if (!isProd) {
                // always read fresh template in dev
                template = readFileSync(resolve("index.html"), "utf-8");
                template = await vite.transformIndexHtml(url, template);
                render = (await vite.ssrLoadModule("/src/entry-server.tsx"))
                    .default;
            } else {
                template = indexProd;
                // @ts-ignore
                render = (await import(resolve("server/entry-server.js")))
                    .default;
            }

            const context: Record<string, any> = {};
            const { stream, didError } = render(url, res);

            if (context.url) {
                return res.redirect(301, context.url);
            }

            res.status(didError ? 500 : 200).set({
                "Content-Type": "text/html",
            });
            const htmlWritable = new HtmlWritable();
            if (didError === false) {
                stream.pipe(htmlWritable);
                htmlWritable.on("finish", () => {
                    const appHtml = htmlWritable.getHtml();
                    const html = template.replace(`<!--ssr-outlet-->`, appHtml);
                    res.send(html);
                });
            } else {
                res.send(
                    '<!doctype html><p>Loading...</p><script src="/src/index.tsx"></script>'
                );
            }
        } catch (e) {
            !isProd && vite.ssrFixStacktrace(e);
            console.log((e as Error).stack);
            res.status(500).end((e as Error).stack);
        }
    });

    return { app, vite };
}

if (!isTest) {
    createServer().then(({ app }) =>
        app.listen(3000, () => {
            console.log(`http://localhost:3000 🚀`);
        })
    );
}
