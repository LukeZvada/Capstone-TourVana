import React, { useContext } from "react"
import { ShowContext } from "./ShowsProvider"

export const ShowSearch = () => {
    const { setTerms } = useContext(ShowContext)

    return (
        <>
            <input type="text" className="show__search"
                onChange={
                    (changeEvent) => {
                        setTerms(changeEvent.target.value)
                    }
                }
                placeholder="Search" />
        </>
    )
}