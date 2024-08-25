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
              <table className="topPlayers-table" id="wg-football-standings">
                <thead></thead>
                <tbody className="topPlayers-tbody">
                  {/* signs row */}
                  <tr className="topPlayers-row">
                    <td
                    title="rank"
                      className="topPlayers-rank"
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
                  
                  {data.map((player:any, index:number) => {
                    return (
                      <tr className="topPlayers-row" key={player.id}>
                        <td className="topPlayers-rank" >
                          {index+1}
                        </td>
                       
                          <td className="topPlayer-name-td">
                                    
                            <span className="topPlayer-name" >{player.name}</span>
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