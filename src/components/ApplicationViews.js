import React from "react"
import { Route } from "react-router-dom"
import { ShowProvider } from "./shows/ShowsProvider"
import { ShowList } from "./shows/ShowsList"
import { ShowForm } from "./shows/ShowsForm"
import { UserProvider } from "./users/UsersProvider"


export const ApplicationViews = (props) => {
    return (
        <>
            <ShowProvider>
                <UserProvider>
                    <Route exact path="/show" render={(props) => {
                        return <ShowList history={props.history} />
                    }} />
                </UserProvider>
            </ShowProvider>

            <ShowProvider>
                <Route path="/show/create" render ={(props) => {
                        return <ShowForm {...props}/>
                    }}>
                </Route>
                <Route path="/show/edit" render ={(props) => {
                        return <ShowForm {...props}/>
                    }}>
                </Route>
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