import React, { useContext, useEffect, useState, useRef } from "react"
import { ShowContext } from "./ShowsProvider"
import "./Shows.css"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export const ShowForm = (props) => {
    const { addShow, getShows, shows, editShow } = useContext(ShowContext)

    const [show, setShow] = useState({})

    const editMode = props.match.params.hasOwnProperty("showId")


    const handleControlledInputChange = (event) => {

        const newShow = Object.assign({}, show)
        newShow[event.target.name] = event.target.value
        setShow(newShow)
    }


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

            if (editMode) {
                editShow({
                    id: show.id,
                    venueName: show.venueName,
                    city: show.city,
                    state: show.state,
                    date: show.date,
                    userId: localStorage.getItem("tourVana_username")
                })
                    .then(() => props.history.push("/show"))
            } else {
                addShow({
                    venueName: show.venueName,
                    city: show.city,
                    state: show.state,
                    date: show.date,
                    userId: localStorage.getItem("tourVana_username")
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
                borderRadius: "5rem",

            },
        },
    }));
    
    const classes = useStyles()

    return (
        <form className="showForm">
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="venueName"></label>
                    <input type="text" name="venueName" required autoFocus className="form-control"
                        placeholder="Venue Name"
                        defaultValue={show.venueName}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="city"></label>
                    <input type="text" name="city" required className="form-control"
                        placeholder="City"
                        defaultValue={show.city}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="state"></label>
                    <input type="text" name="state" required className="form-control"
                        placeholder="State"
                        defaultValue={show.state}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date"></label>
                    <input type="text" name="date" required className="form-control"
                        placeholder="Date"
                        defaultValue={show.date}
                        onChange={handleControlledInputChange}
                    />
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