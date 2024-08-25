import {Outlet, Link} from "react-router-dom"


import "../styles/stats.css"
import React from "react"



export default function Stats({links}:{links:string[]}) {
    
    function onClick(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {


        [...e.currentTarget?.children].map(item=>{
            item.classList.remove("clicked")
        });


        (e.target as Element).parentElement?.parentElement?.classList.add("clicked")

    }


    return(
        <>
        <div className="league-routes-links"  onClick={(e)=>onClick(e)}>
          {links.map(link=>{
            return(
              <div className="league-routes-link" key={link}>
                          <Link to={link}>
                            <h4 >{link}</h4>
                          </Link>
                        </div>
            )
          })}
                    
        </div>
                    <Outlet/>
        </>
    )
    
}