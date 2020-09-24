import React, { useContext } from "react"
import { SettlementImageContext } from "./SettlementsProvider"

export const SettlementSearch = () => {
    const { setSettlementTerms } = useContext(SettlementImageContext)

    return (
        <>
            <article className="showSearch">
                <input type="text"
                    onChange={
                        (changeEvent) => {
                            setSettlementTerms(changeEvent.target.value)
                        }
                    }
                    placeholder="Search" />
            </article>
        </>
    )
}