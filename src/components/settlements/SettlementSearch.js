import React, { useContext } from "react"
import { SettlementImageContext } from "./SettlementsProvider"

export const SettlementSearch = () => {
    const { setSettlementTerms } = useContext(SettlementImageContext)

    return (
        <>
            <input type="text" className="settlementSearch"
                onChange={
                    (changeEvent) => {
                        setSettlementTerms(changeEvent.target.value)
                    }
                }
                placeholder="Search" />
        </>
    )
}