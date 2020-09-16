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
    const [userShows, setUserShows] = useState([])
    const [dealMemo, setDealMemo] = useState([])

    const getShows = () => {
        console.log("getting shows")
        return fetch("http://localhost:8088/show")
            .then(res => res.json())
            .then(setShows)
    }

    const getDealMemo = (dealMemo) => { 
        return fetch(`http://localhost:8088/show/${dealMemo}`)
        .then(res => res.json())
        .then(setDealMemo)
    }

    const getUserShows = (userId) => {
        return fetch(`http://localhost:8088/show?userId=${userId}`)
            .then(res => res.json())
            .then(setUserShows)
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

    const deleteShow = (showId) => {
        console.log("delete method")
        return fetch(`http://localhost:8088/show/${showId}`, {
            method: "DELETE"
        })
            .then(getUserShows)
    }

    const editShow = show => {
        return fetch(`http://localhost:8088/show/${show.id}`, {
            method: "PUT",
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
            shows, addShow, getShows, deleteShow, editShow, getUserShows, userShows,
            getDealMemo, dealMemo
        }}>
            {props.children}
        </ShowContext.Provider>
    )
}









