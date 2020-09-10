import React from "react"
import { Route } from "react-router-dom"


export const ApplicationViews = (props) => {
    return (
        <>
            <div>Tourvana</div>

            <Route path="/logout" render={
                (props) => {
                    localStorage.removeItem("tourVana_username")
                    props.history.push("/login")
                }
            } />
        </>
    )
}