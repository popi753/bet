import { useParams, Routes, Route, Link } from "react-router-dom"

import { onFetchStats } from "../Components/fetch"
import { useLayoutEffect, useState } from "react"

import "../styles/leagues.css"

import Standings from "../Components/Standings"
import TopPlayers from "../Components/TopPlayers"
import Redirect from "../Components/redirect"

export default function Leagues() {

    const params = Number(useParams().id)
    
    const [leagueStats,setLeagueStats] = useState<any>({
        league: {
            logo: null,
            name: null
        },
    })

    const {league}= leagueStats
    
    const other = "https://cdn-icons-png.flaticon.com/512/5042/5042057.png"

    useLayoutEffect(()=>{
        onFetchStats({
            id: params,
            setLeague : setLeagueStats,
        })
    },[])





        

    return (
        <>  
            <div className="league-header">
                <div className="league-header-content">
                    <div className="card-logo">
                        <img src={league.logo || other} alt="logo" />
                        
                    </div>
                    <div className="league-header-text">
                        <h2>{league.name || "league name"}</h2>
                        <h5>2024/2025</h5>
                    </div>
                </div>
                <div className="league-header-links">
                    <div className="league-header-link">       
                                    <Link to={"./standings"} >
                                               <h4>standings</h4>
                                    </Link>
                    </div>                                 
                    <div className="league-header-link">
                                    <Link to={"./topscorers"}>
                                             <h4>topscorers</h4>
                                    </Link>
                    </div>
                    <div className="league-header-link">
                                    <Link to={"./topassists"}>
                                              <h4>topassists</h4>
                                    </Link>
                    </div>
                    
                </div>

            </div>

            <Routes>
                    
                        <Route index element={null} />
                        <Route path="/standings"    element={<Standings/>} />
                        <Route path="/topscorers"   element={<TopPlayers />} />
                        <Route path="/topassists"   element={<TopPlayers />} />
                        <Route path="*"             element={<Redirect />} />


                
            </Routes>

        </>
    )



    
}