import "../styles/topPlayers.css"
import { useQuery,} from "@tanstack/react-query"

import { onFetchStats } from "./fetch"

type topPlayersProps = {
    id : number,
    endpoint: string
}


export default function TopPlayers({id,endpoint}:topPlayersProps) {

    




    const {data} = useQuery({
                queryKey: [endpoint+id], 
                queryFn: ()=>onFetchStats({
                        league: id,
                        endpoint: endpoint
            }), 
                staleTime: 1000*60*5,
})



    

    return(
            <div className="topPlayers-container">
                 <div
            className={data? "" : "wg_loader"}
          >
            {data && (
              <table className="standings-table" id="wg-football-standings">
                <thead>

                <tr className="head-row">
                    <td
                      title="rank"
                      className="standings-rank"
                    >#</td>
                    <td
                      colSpan={1}
                    
                    ></td>
                    <td
                      title="Minutes Played"
                    >
                      MP
                    </td>
                    <td
                      title="Lineups"
                    >
                     LN
                    </td>
                    <td
                      title="Substituted in"
                    >
                      SB
                    </td>
                    <td
                      title="Goals"
                    >
                      G
                    </td>
                    <td
                      title="Assists"
                    >
                      A
                    </td>
                    
                  </tr>

                </thead>
                <tbody className="standings-tbody">
                  
                  
                  {data.map((player:any, index:number) => {
                    return (
                      <tr className="standings-row" key={player.id}>
                        <td className="standings-rank" >
                          {index+1}
                        </td>
                       
                          <td className="relative">
                                    
                            <span className="standing-name" >{player.name}</span>
                            <span className="topPlayer-photo-tooltip">
                                <img  src={player.photo}
                                    alt="Image" 
                                    />
                                  </span>
                          </td>
                        <td >
                          {player.minutes}
                        </td>
                        <td >
                          {player.lineups}
                        </td>
                        <td >
                          {player.substitutes}
                        </td>
                        <td >
                          {player.goals}
                        </td>
                        <td >
                          {player.assists}
                        </td>
                        
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
                    
                    
            </div>
    )
}