import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const ShowContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const ShowProvider = (props) => {
    const [shows, setShows] = useState([])

    const getShows = () => {
        return fetch("http://localhost:8088/show")
            .then(res => res.json())
            .then(setShows)
    }

    const addShow = show => {
        return fetch("http://localhost:8088/show", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(show)
        })
            .then(getShows)
    }

    /*
        You return a context provider which has the
        `shows` state, the `addShow` function,
        and the `getShow` function as keys. This
        allows any child elements to access them.
    */
    return (
        <ShowContext.Provider value={{
            shows, addShow, getShows
        }}>
            {props.children}
        </ShowContext.Provider>
    )
}









