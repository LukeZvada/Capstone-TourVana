import React, { useContext, useEffect } from "react"
import { SettlementImageContext } from "./SettlementsProvider"

export const SettlementReport = (props) => {
    const { settlement, getSettlement } = useContext(SettlementImageContext)
    const currentSettlementId = props.match.params.settlementId
    
    useEffect(() => {
        getSettlement(currentSettlementId)
    }, [])

    return (
        <>
            <section key={settlement.id} className="settlementImage">
                <img src={settlement.attachmentUrl} />
            </section>
        </>
    )
}