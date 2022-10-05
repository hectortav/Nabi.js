import React from "react";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
// @ts-ignore
import staticLocationHook from "wouter/static-location";
import App from "./App";

export default function render(url: string) {
    const location = staticLocationHook(url, { record: true });
    return renderToString(
        <React.StrictMode>
            <Router hook={location}>
                <App />
            </Router>
        </React.StrictMode>
    );
}
