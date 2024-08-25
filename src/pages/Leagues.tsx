import { useParams, Routes, Route, Link } from "react-router-dom"

import {onFetchLeague } from "../Components/fetch"
import { useLayoutEffect, useState } from "react"

import "../styles/leagues.css"

import Standings from "../Components/Standings"
import TopPlayers from "../Components/TopPlayers"
import Redirect from "../Components/redirect"
import LeagueRoutes from "../Components/LeagueRoutes"
import Fantasy from "../Components/Fantasy"










export default  function Leagues() {

    const params = Number(useParams().id)
    
    type league = {
      leagueId: number,
      name: string,
      logo: string
  }
  
  
  const [leagues, setLeagues] = useState<league[]>([]);
  
  useLayoutEffect(()=>{
      onFetchLeague({
          setLeagues:setLeagues,
          id: params,
        })
  },[])



        

    return (
      <>
        <div className="league-header">
          <div className="league-header-content">
            <div className="card-logo">
              <img
                src={
                  leagues[0]?.logo ||
                  "https://cdn-icons-png.flaticon.com/512/5042/5042057.png"
                }
                alt="logo"
              />
            </div>
            <div className="league-header-text">
              <h2>{leagues[0]?.name || "league name"}</h2>
              <h5>2024/2025</h5>
            </div>
          </div>
          <div className="league-header-links">
            <div className="league-header-link">
              <Link to={"./stats"}>
                <h4>stats</h4>
              </Link>
            </div>
            <div className="league-header-link">
              <Link to={"./fantasy"}>
                <h4>fantasy</h4>
              </Link>
            </div>
            <div className="league-header-link">
              {/* <Link to={"./topassists"}>
                <h4>topassists</h4>
              </Link> */}
            </div>
          </div>
        </div>

        <div className="league-routes">
                
          <Routes>
            <Route index element={null} />

            <Route path="/stats/*" element={<LeagueRoutes links={["standings", "topscorers", "topassists"]}/>}>
                    <Route index              element={<Standings id={params} />} />
                    <Route path="standings"   element={<Standings id={params} />} />
                    <Route path="topscorers"  element={<TopPlayers id={params}  endpoint="topscorers"/>} />
                    <Route path="topassists"  element={<TopPlayers id={params}  endpoint="topassists"/>} />
            </Route>
            <Route path="/fantasy" element={<Fantasy id={params}/>}>
                        
            </Route>

            <Route path="*" element={<Redirect />} />
          </Routes>
        </div>
      </>
    );



    
}









