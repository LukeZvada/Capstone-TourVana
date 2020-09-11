import React, { useContext, useRef, useEffect, useState } from "react"
import { ShowContext } from "./ShowsProvider"
import "./Shows.css"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export const ShowForm = (props) => {
    const { addShow, getShows, shows } = useContext(ShowContext)

    const [show, setShow] = useState({})

    const editMode = props.match.params.hasOwnProperty("showId")

    const venueName = useRef(null)
    const city = useRef(null)
    const state = useRef(null)
    const date = useRef(null)



   const getShowInEditMode = () => {
    if (editMode) {
        const showId = parseInt(props.match.params.showId)
        const selectedShow = shows.find(show => show.id === showId) || {}
        setShow(selectedShow)
    }
}

    useEffect(() => {
       getShows()
    }, [])

    useEffect(() => {
        getShowInEditMode()
    }, [shows])

    const constructNewShow = () => {

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

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                background: "#EB5757",
                color: "#FFFFFF",
                width: "300px",
                borderRadius: "5rem"
            },
        },
        buttonStyle: {
            '& > *': {
                margin: theme.spacing(1),
                background: "#EB5757",
                color: "#FFFFFF",
                width: "180px",
                height: "20px",
                borderRadius: "5rem"
            },
        },
    }));
    
    const classes = useStyles()

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
            <section className={classes.buttonStyle}>
                <Button className="saveShowButton" variant="contained" type="submit"
                    onClick={evt => {
                        evt.preventDefault() 
                        constructNewShow()
                    }}
                    className="btn btn-primary">
                    Save Show
                </Button>
            </section>
        </form>
    )
}