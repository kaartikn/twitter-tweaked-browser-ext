import React from "react";
import { createRoot } from "react-dom/client";

function Popup() {
    return (
        <div>
            <h1>Hello, world</h1>
            <p>This is a simple Popup</p>
        </div>
    )
}
const container = document.getElementById("react-target")
const root = createRoot(container)

root.render(<Popup />)