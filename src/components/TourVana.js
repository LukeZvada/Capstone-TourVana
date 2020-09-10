  
import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"



export const TourVana = () => (
    

    <>
        <Route render={() => {
            console.log(localStorage.getItem("tourVana_username"))
            if (localStorage.getItem("tourVana_username")) {
                console.log("the user is logged in")
                return (
                    <>
                        <Route render={props => <NavBar {...props} />} />
                        <Route render={props => <ApplicationViews {...props} />} />
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
)



























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
  