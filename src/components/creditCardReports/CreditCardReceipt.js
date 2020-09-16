import React, { useState, useContext, useEffect } from "react"
import { CreditCardReportContext } from './CreditCardProvider'


export const ReceiptView = (props) => {

    const { purchase, getPurchase, deletePurchase, getUserPurchases, userPurchases } = useContext(CreditCardReportContext)
    const { receipt, getReceipt } = useContext(CreditCardReportContext)
    const currentReceiptId = props.match.params.purchaseId
    console.log(receipt)
    useEffect(() => {
        getReceipt(currentReceiptId)
    }, [])
    
    return (
        <>
            <h2>Purchase Receipt Image</h2>
            <section key={receipt.id} className="purchaseReceiptImage">
                <img src={receipt.attachementUrl} />
            </section>
        </>
    )
}