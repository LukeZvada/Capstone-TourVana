import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { TourVana } from "./components/TourVana";
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <TourVana />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)