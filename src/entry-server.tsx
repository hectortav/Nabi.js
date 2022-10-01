import React from "react";
import ReactDOM from "react-dom/server";
import { Router } from "wouter";
// @ts-ignore
import staticLocationHook from "wouter/static-location";
import App from "./App";

let didError = false;
export default function render(url: string) {
    const location = staticLocationHook(url, { record: true });
    const stream = ReactDOM.renderToPipeableStream(
        <React.StrictMode>
            <Router hook={location}>
                <App />
            </Router>
        </React.StrictMode>,
        {
            onError(err) {
                didError = true;
                console.error(err);
            },
        }
    );
    return { stream, didError };
}
