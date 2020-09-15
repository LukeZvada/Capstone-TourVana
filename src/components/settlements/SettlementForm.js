import React, { useState } from "react"



export const SettlementImageUpload = () => {
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
  
    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'lzvada')
        setLoading(true)
        const res = await fetch('https://api.cloudinary.com/v1_1/zvada/image/upload',
            {
            method: 'POST',
            body: data
            }
        )
        const file = await res.json()
    
        setImage(file.secure_url)
        setLoading(false)

        // here, I will use the file.secure_url and save that url to your database.json
        // you'll create something like a settlementProvider file that includes methods to get/post/etc to your database (like EmployeeProvider does in your other project)
        // you'll import that file above
        // then here, you'll call the add method...probably addSettlement() and pass in the image url and the show id (still need to do the work to have the show id)
    }

    return (
        <section className="settlement--card">

            <div className="Upload">
                <input type="file" name="file" placeholder="Upload an image"
                onChange={uploadImage}
                />
                {loading 
                ? (
                    <h3>It's getting the shit ...</h3>
                ) : (
                    <img src={image} style={{ width: '300px' }} />
                    )}
                </div>
        </section>
    )
  }
  