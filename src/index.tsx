import React from "react";
import { render } from "react-dom";
import { hydrateRoot } from "react-dom/client";
import App from "./App";

hydrateRoot(
    document.getElementById("root") as HTMLElement,
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// https://github.com/vercel/next.js/blob/c7ab8314d759c88c620848f472698207d186d98d/packages/next/client/index.tsx
