import React, { useState, useContext, useEffect } from "react"
import { CreditCardReportContext } from './CreditCardProvider'

export const ReceiptView = (props) => {

    const { receipt, getReceipt } = useContext(CreditCardReportContext)
    const currentReceiptId = props.match.params.purchaseId
    console.log(receipt)
    useEffect(() => {
        getReceipt(currentReceiptId)
    }, [])
    
    return (
        <>
            <section key={receipt.id} className="purchaseReceiptImage">
                <img src={receipt.attachementUrl} />
            </section>
        </>
    )
}