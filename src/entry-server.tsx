import React from "react";
import ReactDOM from "react-dom/server";
import { Router } from "wouter";
// @ts-ignore
import staticLocationHook from "wouter/static-location";
import App from "./App";

export default function render(url: string) {
    const location = staticLocationHook(url, { record: true });
    return ReactDOM.renderToString(
        <React.StrictMode>
            <Router hook={location}>
                <App />
            </Router>
        </React.StrictMode>
    );
}
