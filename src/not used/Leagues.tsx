import { useParams, Routes, Route, Link } from "react-router-dom"

import { onFetchStats } from "../Components/fetch"
import { useLayoutEffect, useState } from "react"

import "../styles/leagues.css"

import Standings from "../Components/Standings"
import TopPlayers from "../Components/TopPlayers"
import Redirect from "../Components/redirect"

interface league {
    id: string;
    leagueId: number;
    logo: String;
    name: String;
    v: number;
}

interface team{
    id      :    number;
    logo    :    string;
    name    :    string;
}
interface standings {
    rank    :    number;
    team    :    team;
    points  :    number;

}


interface topPlayer {
assists         :    number;
goals           :    number;
name            :    string;
playerId        :    number;
photo           :    string;
}

type leagueStats = undefined | {
    league      :    league;
    Standings   :    standings[];
    topAssists  :    topPlayer[];
    topScorers  :    topPlayer[];
}

export default function Leagues() {

    const params = Number(useParams().id)
    
    const [leagueStats,setLeagueStats] = useState<leagueStats>(
    //     {
    //     league: {
    //         id: "",
    //         v: 0,
    //         leagueId: null,
    //         name: "leaguen name",
    //         logo: "https://cdn-icons-png.flaticon.com/512/5042/5042057.png"
    //     },
    //     Standings  : [{rank: 0, team: {id:0, logo:"https://cdn-icons-png.flaticon.com/512/5042/5042057.png", name:"team name"}, points: 0}],
    //     topAssists : [{assists:0, goals:0, name:"player name",playerId:0}],
    //     topScorers : [{assists:0, goals:0, name:"player name",playerId:0}],
    // }
)

    


    const {league}= leagueStats
    

    useLayoutEffect(()=>{
        onFetchStats({
            id: params,
            setLeague : setLeagueStats,
        })
    },[])

    console.log(leagueStats)



        

    return (
        <>  
            <div className="league-header">
                <div className="league-header-content">
                    <div className="card-logo">
                        <img src={league.logo} alt="logo" />
                        
                    </div>
                    <div className="league-header-text">
                        <h2>{league.name}</h2>
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

            <div className="league-routes">
                    <Routes>
                    
                                <Route index element={null} />
                                <Route path="/standings"    element={<Standings  standings={leagueStats.standings}/>} />
                                <Route path="/topscorers"   element={<TopPlayers topPlayers={leagueStats.topScorers}/>} />
                                <Route path="/topassists"   element={<TopPlayers topPlayers={leagueStats.topAssists}/>} />
                                <Route path="*"             element={<Redirect />} />
                    </Routes>
            </div>

        </>
    )



    
}