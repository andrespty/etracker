import { useEffect, useState } from "react"

export const useHideOnScroll = () => {

    const [ show, setShow ] = useState(window.pageYOffset === 0)
    const [ lastScrollY, setLastScrollY] = useState(0)

    const controlShow = () => {
        if (typeof window !== 'undefined'){
            if (window.scrollY > lastScrollY){
                setShow(false)
            }
            else {
                setShow(true)
            }

            setLastScrollY(window.scrollY)
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined'){
            window.addEventListener('scroll', controlShow)    
            return () => {
                window.removeEventListener('scroll', controlShow)
            }
        }
    }, [])
    
    return { show }
}