import React from "react"
import "./Shows.css"


export const Show = ({ show }) => (
    <section key={show.id} className="show">
        <div><h3>{show.timestamp}</h3></div>
        <div>{show.venueName}</div>
        <div>Owner: {show.city}</div>
        <div>Location: {show.state}</div>
    </section>
)