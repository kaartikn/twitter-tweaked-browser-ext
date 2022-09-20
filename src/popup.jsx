import React from "react";
import { createRoot } from "react-dom/client";
import MyDropdown from "./components/accordions";
import 'bootstrap/dist/css/bootstrap.min.css';

function Popup() {
    return (
        <div>
            <h1>Hello, world</h1>
            <p>This is a simple Popup</p>
            <MyDropdown />
        </div>
    )
}
const container = document.getElementById("react-target")
const root = createRoot(container)

root.render(<Popup />)