import React, { useState, useContext, useEffect } from "react"
import { ShowContext } from "./ShowsProvider"

export const DealMemoView = (props) => { 
        const { dealMemo, getDealMemo } = useContext(ShowContext)
        const currentDealMemoId = props.match.params.showId

        useEffect(() => {
            getDealMemo(currentDealMemoId)
        }, [])
        
        return (
            <>
            <h2>Deal Memo Image</h2>
            <section key={dealMemo.id} className="purchaseReceiptImage">
                <img src={dealMemo.dealMemoUrl} />
            </section>
        </>
    )
}