import { useState, useLayoutEffect } from "react";
import Card from "../Components/Card"
import "../styles/home.css"
import { Link } from "react-router-dom"

import { onFetchLeagues}  from "../Components/fetch";


export default function Home() {

    type typeLeagues = {
        leagueId: number,
        name: string,
        logo: string
    }
    
    
    const [leagues, setLeagues] = useState<typeLeagues[]>([]);
    
    useLayoutEffect(()=>{
        onFetchLeagues({setLeagues})
    },[])



    

    return(
    <div className="home">
            <div className="welcome-text">
                <h1>Welcome to the <span>BomboclatBet</span></h1>
            </div>

            <div className="card-container">

                {leagues.map((league)=>{
                    return(
                        <Link to={`/leagues/${league.leagueId}`} key={league.leagueId} >
                            <Card
                            name={league.name}
                            logo={league.logo}
                            />
                        </Link>
                    )
                })}
                
                
                
                

            </div>


    </div>
    )
}





