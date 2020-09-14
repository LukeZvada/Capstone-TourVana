import React, { useContext, useEffect, useState } from "react"
import { ShowContext } from "./ShowsProvider"
import { UserContext } from "../users/UsersProvider"
import Calendar from 'react-calendar'; 
import "./Shows.css"
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const ShowList = (props) => {
    const { shows, getShows, userShows, getUserShows, deleteShow } = useContext(ShowContext)
    const { users, getUsers, getCurrentUser, currentUser } = useContext(UserContext)
    const [ date, setDate ] = useState(new Date());

    useEffect(() => {
        getShows()
        getUsers()
        getCurrentUser()
    }, [])

    // const onChange = () => { 
    //     setDate(date);
    // }
 
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            color: "#EB5757",  
            position: "fixed",
            display: "flex",
            bottom: 0,
            background: "white",
            margin: 0
          },
        },
        primary: {
          '& > *': {
            color: "black"
          },
        },

      }));

    const classes = useStyles()

    return (
        <>
            <article className="welcomeMessage">
                <section key={currentUser.id} className="user">
                    <div><h1 className="welcomeTitle">Welcome, {currentUser.firstName}</h1></div>
                </section>
            </article>
            
            <article>
                <div><h2 className="upcomingShows">Upcoming Shows</h2></div>
            </article>

            <article className="showsContainer">
                {
                    shows.map(show => {
                            return <section key={show.id} className="shows">
                                        <div className="showDate">{show.date} </div>
                                        <div className="showLocation"> <h1 className="venueTitle"> {show.venueName} </h1> <h2 className="venueSubTitle">{show.city}, {show.state}</h2> </div> 
                                        <div className="showIcons"> 
                                            <button className="deleteShowButton" variant="contained"
                                                onClick={
                                                    () => deleteShow(show.id).then(props.history.push("/show"))
                                                }>
                                                <DeleteIcon style={{ fontSize: 20 }} className={classes.primary} /> 
                                            </button>
                                            <button className="deleteShowButton" 
                                                onClick={() => {
                                                        props.history.push(`/show/edit/${show.id}`)
                                                }}>
                                                <EditIcon style={{ fontSize: 20 }} className={classes.primary} /> 
                                            </button>
                                            <button className="deleteShowButton">
                                                <AssignmentIcon style={{ fontSize: 20 }} className={classes.primary} /> 
                                            </button>
                                        </div>
                                    </section>
                            
                    })
                }
            </article>
            <section className={classes.root}>
                <Button className="addShowButton" onClick={() => props.history.push("/show/create")}>
                    <AddCircleOutlineIcon />
                </Button>
            </section>
        </>
    )

}


// export const Cloudinary = () => {
//     const [image, setImage] = useState('')
//     const [loading, setLoading] = useState(false)
  
//     const uploadImage = async e => {
//         const files = e.target.files
//         const data = new FormData()
//         data.append('file', files[0])
//         data.append('upload_preset', 'lzvada')
//         setLoading(true)
//         const res = await fetch(
//             '	https://api.cloudinary.com/v1_1/zvada/image/upload',
//             {
//             method: 'POST',
//             body: data
//             }
//         )
//         const file = await res.json()
    
//         setImage(file.secure_url)
//         setLoading(false)

//         // here, I will use the file.secure_url and save that url to your database.json
//         // you'll create something like a settlementProvider file that includes methods to get/post/etc to your database (like EmployeeProvider does in your other project)
//         // you'll import that file above
//         // then here, you'll call the add method...probably addSettlement() and pass in the image url and the show id (still need to do the work to have the show id)
//     }

//     return (
//       <div className="Upload">
//         <input
//           type="file"
//           name="file"
//           placeholder="Upload an image"
//           onChange={uploadImage}
//         />
//         {loading ? (
//           <h3><CachedIcon /></h3>
//         ) : (
//           <img src={image} style={{ width: '300px' }} />
//         )}
//       </div>
//     )
//   }