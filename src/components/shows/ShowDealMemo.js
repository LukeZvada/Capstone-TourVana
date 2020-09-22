import React, { useContext, useEffect } from "react"
import { ShowContext } from "./ShowsProvider"

export const DealMemoView = (props) => { 
        const { dealMemo, getDealMemo } = useContext(ShowContext)
        const currentDealMemoId = props.match.params.showId

        useEffect(() => {
            getDealMemo(currentDealMemoId)
        }, [])
        
        return (
            <>
            <section key={dealMemo.id} className="dealMemoImage">
                <img src={dealMemo.dealMemoUrl} />
            </section>
        </>
    )
}