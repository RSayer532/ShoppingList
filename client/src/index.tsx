import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";

let rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
