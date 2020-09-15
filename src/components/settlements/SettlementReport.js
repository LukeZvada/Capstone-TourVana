import React, { useState, useContext, useEffect } from "react"
import { SettlementImageContext } from "./SettlementsProvider"




export const SettlementReport = (props) => {
    const { uploadedImages, getUploadedImages } = useContext(SettlementImageContext)


    useEffect(() => {
        getUploadedImages()
     }, [])

     return (
         <>
         <h2>Settlement Image</h2>

            {
                uploadedImages.map(image => {
                    return <section key={image.id} className="settlementImage">
                               <img src={image.attachmentUrl} />
                            </section>
                })
            }
         </>
     )
}