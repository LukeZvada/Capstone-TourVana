import React from "react"
import { Route } from "react-router-dom"
import { ShowProvider } from "./shows/ShowsProvider"
import { ShowList } from "./shows/ShowsList"
import { UserProvider } from "./users/UsersProvider"


export const ApplicationViews = (props) => {
    return (
        <>
            <ShowProvider>
                <UserProvider>
                    <ShowList />
                </UserProvider>
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