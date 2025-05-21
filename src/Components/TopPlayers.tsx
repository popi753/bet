import "../styles/topPlayers.css"
import { useQuery, } from "@tanstack/react-query"

import { onFetchStats, type topPlayer} from "../fetch/leagues"



type topPlayersProps = {
  leagueId: number,
  endpoint: string
}


export default function TopPlayers({ leagueId, endpoint }: topPlayersProps) {



  const { data, isError, isLoading } = useQuery<topPlayer[]>({
    queryKey: [endpoint + leagueId],
    queryFn: () => onFetchStats(
      leagueId,
      endpoint),
    staleTime: 1000 * 60 * 5,
  })




  return (
    <div className="stats-container">

      {isError ? <div className="error">no information try later</div> :
        isLoading ?
          <div className="wg_loader"></div> :
          data ?
            <div>
              <table className="stats-table" id="wg-football-standings">
                <thead>

                  <tr className="head-row">
                    <td
                      title="rank"
                      className="standings-rank"
                    >#</td>
                    <td
                      colSpan={2}

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
                <tbody >


                  {data.map((player: any, index: number) => {
                    return (
                      <tr className="standings-row" key={player.id}>
                        <td className="standings-rank" >
                          {index + 1}
                        </td>
                        <td >

                          <img className="standings-logo"
                            src={player.teamLogo} loading="lazy"
                          />
                        </td>

                        <td className="relative">

                          <span className="standing-name" >{player.name}</span>
                          <span className="topPlayer-photo-tooltip">
                            <img src={player.photo}
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

            </div>
            : <div>something went wrong</div>
      }


    </div>
  )
}