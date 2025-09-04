'use client'

import { useEffect, useState } from "react"

export const useScreen = () => {
    const [dimensions , setDimensions] = useState({
        width:0,
        height:0,
    })


    const updateDimensions = () => {
        setDimensions({
            width:window.innerWidth,
            height:window.innerHeight
        })
    }

    useEffect(() => {
        updateDimensions();
        window.addEventListener("resize" , updateDimensions);

        return () => {
            window.removeEventListener('resize' , updateDimensions);
        }
    } , [])


    return dimensions
}