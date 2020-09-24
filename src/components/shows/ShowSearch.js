import React, { useContext } from "react"
import { ShowContext } from "./ShowsProvider"

export const ShowSearch = () => {
    const { setTerms } = useContext(ShowContext)

    return (
        <>
            <article className="showSearch">
                <input type="text" 
                    onChange={
                        (changeEvent) => {
                            setTerms(changeEvent.target.value)
                        }
                    }
                    placeholder="Search" />
            </article>
        </>
    )
}