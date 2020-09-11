import React, { useContext, useRef, useEffect } from "react"
import { ShowContext } from "./ShowsProvider"
import "./Shows.css"

export const ShowForm = (props) => {
    const { addShow, getShows } = useContext(ShowContext)

    /*
        Create references that can be attached to the input
        fields in the form. This will allow you to get the
        value of the input fields later when the user clicks
        the save button.

        No more `document.querySelector()` in React.
    */
    const venueName = useRef(null)
    const city = useRef(null)
    const state = useRef(null)
    const date = useRef(null)

    /*
        Get animal state and location state on initialization.
    */
    useEffect(() => {
       getShows()
    }, [])

    const constructNewShow = () => {
        /*
            The `location` and `animal` variables below are
            the references attached to the input fields. You
            can't just ask for the `.value` property directly,
            but rather `.current.value` now in React.
        */

        if (venueName === 0) {
            window.alert("Please type a venue")
        } else {
            addShow({
                venueName: venueName.current.value,
                city: city.current.value,
                state: state.current.value,
                date: date.current.value,
                

            })
            .then(() => props.history.push("/show"))
        }
    }

    return (
        <form className="showForm">
            <h2 className="showForm__title">New Show</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="venueName"></label>
                    <input type="text" id="venueName" ref={venueName} required autoFocus className="form-control" placeholder="Venue Name" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="showCity"></label>
                    <input type="text" id="showCity" ref={city} required autoFocus className="form-control" placeholder="City" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="showState"></label>
                    <input type="text" id="showState" ref={state} required autoFocus className="form-control" placeholder="State" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="showDate"></label>
                    <input type="text" id="showDate" ref={date} required autoFocus className="form-control" placeholder="Date" />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewShow()
                }}
                className="btn btn-primary">
                Save Show
            </button>
        </form>
    )
}