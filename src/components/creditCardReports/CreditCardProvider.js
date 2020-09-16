import React, { useState } from "react"

export const CreditCardReportContext = React.createContext()

export const CCReportProvider = (props) => {
    const [purchase, setPurchase] = useState([])
    const [userPurchases, setUserPurchases] = useState([])
    const [receipt, setReceipt] = useState([])

    const getPurchase = () => {
        return fetch("http://localhost:8088/creditCardReport")
            .then(res => res.json())
            .then(setPurchase)
    }

    const getReceipt = (receipt) => { 
        return fetch(`http://localhost:8088/creditCardReport/${receipt}`)
        .then(res => res.json())
        .then(setReceipt)
    }

    const getUserPurchases = (userId) => {
        return fetch(`http://localhost:8088/creditCardReport?userId=${userId}`)
            .then(res => res.json())
            .then(setUserPurchases)
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
        return fetch(`http://localhost:8088/creditCardReport/${purchaseId}`, {
            method: "DELETE"
        })
            .then(getUserPurchases)
    }

    const editPurchase = purchase => {
        return fetch(`http://localhost:8088/creditCardReport/${purchase.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchase)
        })
            .then(getPurchase)
    }

    return (
        <CreditCardReportContext.Provider value={{
            purchase, getPurchase, addPurchase, deletePurchase, editPurchase, getUserPurchases, userPurchases,
            receipt, getReceipt
        }}>
            {props.children}
        </CreditCardReportContext.Provider>
    )
}
