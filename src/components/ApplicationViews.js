import React from "react"
import { Route } from "react-router-dom"
import { ShowProvider } from "./shows/ShowsProvider"
import { ShowList } from "./shows/ShowsList"


export const ApplicationViews = (props) => {
    return (
        <>
            <ShowProvider>
                <ShowList />
            </ShowProvider>

            <Route path="/logout" render={
                (props) => {
                    localStorage.removeItem("tourVana_username")
                    props.history.push("/login")
                }
            } />
        </>
    )
}