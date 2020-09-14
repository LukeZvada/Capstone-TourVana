import React from "react"
import { Route } from "react-router-dom"
import { ShowProvider } from "./shows/ShowsProvider"
import { ShowList } from "./shows/ShowsList"
import { ShowForm } from "./shows/ShowsForm"
import { UserProvider } from "./users/UsersProvider"
import { CCReportProvider } from "./creditCardReports/CreditCardProvider"
import { PurchaseList } from "./creditCardReports/CreditCardList"
import { PurchaseForm } from "./creditCardReports/CreditCardForm"



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
                <Route path="/show/edit/:showId(\d+)" render ={(props) => {
                        return <ShowForm {...props}/>
                    }}>
                </Route>
            </ShowProvider>

            <CCReportProvider>
                <UserProvider>
                    <Route exact path="/creditCardReport" render={(props) => {
                        return <PurchaseList history={props.history} />
                    }} />
                </UserProvider>
            </CCReportProvider>

            <CCReportProvider>
                <Route path="/creditCardReport/create" render ={(props) => {
                        return <PurchaseForm {...props}/>
                    }}>
                </Route>
                <Route path="/creditCardReport/edit/:purchaseId(\d+)" render ={(props) => {
                        return <PurchaseForm {...props}/>
                    }}>
                </Route>
            </CCReportProvider>


            <Route path="/logout" render={
                (props) => {
                    localStorage.removeItem("tourVana_username")
                    props.history.push("/login")
                }
            } />
        </>
    )
}