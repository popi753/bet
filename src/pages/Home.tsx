import { useState, useEffect } from "react";
import Card from "../Components/Card"
import "../styles/home.css"
import { Link } from "react-router-dom"

import { onFetchLeague}  from "../fetch/leagues";


export default function Home() {

    type league = {
        leagueId: number,
        name: string,
        logo: string,
        country: string
    }
    
    
    const [leagues, setLeagues] = useState<league[]>([]);
    
    useEffect(()=>{
        onFetchLeague({
            setLeagues:setLeagues,
            id: 0,
          })
    },[])


    

    return(
    <div className="home">
            <div className="welcome-text">
                <h1>Welcome to the <span>BomboclatBet</span></h1>
            </div>

            <div className="card-container">

                {leagues.length ? leagues.map((league)=>{
                    return(
                        <Link to={`/leagues/${league.leagueId}`} key={league.leagueId} >
                            <Card
                            name={league.name}
                            logo={league.logo}
                            />
                        </Link>
                    )
                }): <>loading...</>}
                
                
                
                

            </div>


    </div>
    )
}





