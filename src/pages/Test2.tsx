import { useState } from "react"
import "../styles/test2.css"





export default function Test2() {

    const [throwin, setThrowin] = useState<number>(0)



    return(
        <>

            <div>throw ins: {throwin}</div>
            <button
            onClick={()=>{
                setThrowin(throwin+1)
            }}
            >+</button>
            <br />
            <br />
            <br />

            <button
            onClick={()=>{
                setThrowin(throwin-1)
            }}
            >-</button>

        </>

    )

}
