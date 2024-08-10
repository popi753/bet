import {useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Redirect() {
    const navigate = useNavigate();
    const url = window.location.href.slice(window.location.href.lastIndexOf("/")+1);

    useEffect(() => {
        {navigate("/"+url)}
    
      
    }, [])

    return (
        <>
            redirecting
        </>
    )        
    
    
}