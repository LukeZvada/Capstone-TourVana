import React, { useState, useContext, useEffect } from "react"
import { SettlementImageContext } from "./SettlementsProvider"
import { ShowContext } from "../shows/ShowsProvider"



export const SettlementReport = (props) => {
    const { uploadedImages, setUploadedImages } = useContext(SettlementImageContext)
    const [ showImage, setShowImage ] = useState({})
    const { addShow, getShows, shows, editShow } = useContext(ShowContext)
    const [show, setShow] = useState({})

    const imageMode = props.match.params.hasOwnProperty("showId")

    const getShowInImageMode = () => {
        if (imageMode) {
            const showId = parseInt(props.match.params.showId)
            const selectedShow = show.find(show => show.id === showId) || {}
            setShow(selectedShow)
        }
    }

    useEffect(() => {
        getShows()
     }, [])
 
     useEffect(() => {
         getShowInImageMode()
     }, [shows])

}