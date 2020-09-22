import React, { useState } from "react"
import { ShowContext } from "../shows/ShowsProvider"

export const SettlementImageContext = React.createContext()

export const SettlementImageProvider = (props) => {
    const [settlements, setSettlements] = useState([])
    const [settlement, setSettlement] = useState([])
    const [searchSettlementTerms, setSettlementTerms] = useState("")

    // create an addSettlement method
    const addSettlementImage = image => {
        return fetch("http://localhost:8088/settlement", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(image)
        })
    }

    const getSettlements = () => {
        return fetch(`http://localhost:8088/settlement`)
            .then(res => res.json())
            .then(setSettlements)
    }

    const getSettlement = (settlement) => {
        return fetch(`http://localhost:8088/settlement/${settlement}`)
            .then(res => res.json())
            .then(setSettlement)
    }

    return (
        <SettlementImageContext.Provider value={{
            getSettlements, settlements, getSettlement, settlement,
            addSettlementImage, searchSettlementTerms, setSettlementTerms
        }}>
            {props.children}
        </SettlementImageContext.Provider>
    )
}