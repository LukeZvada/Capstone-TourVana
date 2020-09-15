import React, { useState } from "react"

export const SettlementImageContext = React.createContext()


export const SettlementImageProvider = (props) => {
    const [uploadedImages, setUploadedImages] = useState([])

    // create an addSettlement method
    const addSettlementImage = image => {
        return fetch("http://localhost:8088/settlement", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(image)
        })
            .then(getUploadedImages)
    }

    const getUploadedImages = () => {
        return fetch("https://api.cloudinary.com/v1_1/zvada/image/upload")
            .then(res => res.json())
            .then(setUploadedImages)
    }

    return (
        <SettlementImageContext.Provider value={{
            uploadedImages, setUploadedImages, getUploadedImages, 
            addSettlementImage
        }}>
            {props.children}
        </SettlementImageContext.Provider>
    )
}