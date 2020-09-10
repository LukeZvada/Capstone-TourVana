import React, { useContext, useEffect } from "react"
import { ShowContext } from "./ShowsProvider"
import "./Shows.css"
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';

export const ShowList = (props) => {
    const { shows, getShows } = useContext(ShowContext)


    useEffect(() => {
        getShows()
    }, [])

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            color: "#EB5757"
          },
        },
      }));

    const classes = useStyles()

    return (
        <>
            <article className="showsContainer">
                {
                    shows.map(show => {
                            return <section key={show.id} className="shows">
                                        <div>{show.timestamp} {show.venueName} {show.city} {show.state}</div>
                                    </section>
                    })
                }
            </article>
            <section className={classes.root}>
                <Button onClick={() => props.history.push("/show/create")}>
                    <AddCircleOutlineIcon />
                </Button>
            </section>
        </>
    )

}