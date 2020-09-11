import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const CreditCardReportContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const CCReportProvider = (props) => {
    const [purchase, setPurchase] = useState([])

    const getPurchase = () => {
        return fetch("http://localhost:8088/creditCardReport")
            .then(res => res.json())
            .then(setPurchase)
    }

    const addPurchase = purchase => {
        return fetch("http://localhost:8088/creditCardReport", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchase)
        })
            .then(getPurchase)
    }

    const deletePurchase = (purchaseId) => {
        return fetch(`http://localhost:8088/show/${purchaseId}`, {
            method: "DELETE"
        })
            .then(getPurchase)
    }

    const editPurchase = purchase => {
        return fetch(`http://localhost:8088/show/${purchase.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchase)
        })
            .then(getPurchase)
    }
    /*
        You return a context provider which has the
        `shows` state, the `addShow` function,
        and the `getShow` function as keys. This
        allows any child elements to access them.
    */
    return (
        <ShowContext.Provider value={{
            purchase, getPurchase, addPurchase, deletePurchase, editPurchase
        }}>
            {props.children}
        </ShowContext.Provider>
    )
}
