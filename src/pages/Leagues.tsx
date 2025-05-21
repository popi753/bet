import { useParams, Routes, Route, Link } from "react-router-dom"

import {onFetchLeague } from "../fetch/leagues"
import { useEffect, useState } from "react"

import "../styles/leagues.css"

import Standings from "../Components/Standings"

import Fixtures from "../Components/Fixtures"

import TopPlayers from "../Components/TopPlayers"

import LeagueRoutes from "../Components/LeagueRoutes"

import Fantasy from "../Components/Fantasy"

import Leaderboard from "../Components/Leaderboard"

import Redirect from "../Components/redirect"











export default  function Leagues() {

    const params = Number(useParams().id)
    
    type league = {
      leagueId: number,
      name: string,
      logo: string
      country : string
  }
  
  
  const [leagues, setLeagues] = useState<league[]>([]);
  
  useEffect(()=>{
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
              <h5>{"flag"+ leagues[0]?.country}</h5>
            </div>
          </div>
          
          <div className="league-header-links">
            <div className="league-header-link">
              <Link to={"./stats"}>
                <h4>Stats</h4>
              </Link>
            </div>
            <div className="league-header-link">
              <Link to={"./fantasy"}>
                <h4>Fantasy</h4>
              </Link>
            </div>
            <div className="league-header-link">
              <Link to={"./Leaderboard"}>
                <h4>Leaderboard</h4>
              </Link>
            </div>
          </div>
        </div>

        <div className="league-routes">
                
          <Routes>
            <Route index element={null} />

            <Route path="/stats/*" element={<LeagueRoutes links={["standings","results","fixtures", "topscorers", "topassists"]}/>}>
                    <Route index              element={<Standings       leagueId={params} />} />
                    <Route path="standings"   element={<Standings       leagueId={params} />} />
                    <Route path="fixtures"    element={<Fixtures        leagueId={params}        endpoint="fixtures"/>} />
                    <Route path="results"     element={<Fixtures        leagueId={params}        endpoint="results"/>} />
                    <Route path="topscorers"  element={<TopPlayers      leagueId={params}        endpoint="topscorers"/>} />
                    <Route path="topassists"  element={<TopPlayers      leagueId={params}        endpoint="topassists"/>} />
            </Route>
            <Route path="/fantasy" element={<Fantasy                    leagueId={params}/>}>
                        
            </Route>

            <Route path="/Leaderboard" element={<Leaderboard            leagueId={params}/>}>
                        
            </Route> 

             <Route path="*" element={<Redirect />} />
          </Routes>
        </div>
      </>
    );



    
}









