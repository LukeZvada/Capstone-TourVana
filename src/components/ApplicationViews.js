import React from "react"
import { Route } from "react-router-dom"
import { ShowProvider } from "./shows/ShowsProvider"
import { ShowList } from "./shows/ShowsList"
import { ShowForm } from "./shows/ShowsForm"
import { ShowSearch } from "./shows/ShowSearch"
import { DealMemoView } from "./shows/ShowDealMemo"
import { UserProvider } from "./users/UsersProvider"
import { CCReportProvider } from "./creditCardReports/CreditCardProvider"
import { PurchaseList } from "./creditCardReports/CreditCardList"
import { PurchaseForm } from "./creditCardReports/CreditCardForm"
import { SettlementList } from "./settlements/SettlementList"
import { SettlementImageUpload } from "./settlements/SettlementForm"
import { SettlementImageProvider } from "./settlements/SettlementsProvider"
import { SettlementReport } from "./settlements/SettlementReport"
import { ReceiptView } from "./creditCardReports/CreditCardReceipt"
import { SettlementSearch } from "./settlements/SettlementSearch"
import { ExpenseSearch } from "./creditCardReports/CreditCardSearch"
import { CreditCardChart } from "./creditCardReports/CreditCardChart"



export const ApplicationViews = (props) => {
    return (
        <>
            <ShowProvider>
                <UserProvider>
                    <Route exact path="/show" render={(props) => {
                        return <> 
                            <ShowSearch />
                            <ShowList history={props.history} />
                        </>
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
                <Route path="/show/:showId(\d+)" render ={(props) => {
                        return <DealMemoView {...props}/>
                    }}>
                </Route>
            </ShowProvider>

            <ShowProvider>
                <UserProvider>
                    <SettlementImageProvider>
                        <Route exact path="/settlement" render={(props) => {
                            return <> 
                            <SettlementSearch />
                            <SettlementList history={props.history} />
                            </>
                        }} />
                        
                    </SettlementImageProvider>
                </UserProvider>
            </ShowProvider>

            <ShowProvider>
                <UserProvider>
                    <SettlementImageProvider>
                        <Route path="/settlement/create/:showId(\d+)" render ={(props) => {
                            return <SettlementImageUpload {...props}/>
                        }}>
                        </Route>
                        <Route path="/settlement/:settlementId(\d+)" render ={(props) => {
                            return <SettlementReport {...props}/>
                        }}>
                        </Route>
                    </SettlementImageProvider>
                </UserProvider>
            </ShowProvider>

            <CCReportProvider>
                <UserProvider>
                    <Route exact path="/creditCardReport" render={(props) => {
                        return <>
                        <ExpenseSearch />
                        <PurchaseList history={props.history} />
                        </>
                    }} />
                    <Route path="/creditCardReport/:purchaseId(\d+)" render ={(props) => {
                        return <ReceiptView {...props}/>
                    }}>                        
                    </Route>
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
                <Route path="/creditCardReport/chart" render ={(props) => {
                        return <CreditCardChart history={props.history} />
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