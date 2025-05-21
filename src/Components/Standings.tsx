import { onFetchLeagueStandings, type standing } from "../fetch/leagues";

import { useQuery } from "@tanstack/react-query"

import "../styles/standings.css";






export default function Standings({ leagueId }: { leagueId: number }) {

  
  const { data, isError, isLoading} = useQuery<standing[]>({
    queryKey: ["standings" + leagueId],
    queryFn: () => onFetchLeagueStandings(leagueId),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    retryDelay: 2000,
    retryOnMount : true,
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus : false
  })

  

  return (


    <>
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
                        className="standings-rank"
                      >#</td>
                      <td
                        colSpan={2}
                      ></td>
                      <td
                        title="Matches Played"
                      >
                        MP
                      </td>
                      <td
                        title="Win"
                      >
                        W
                      </td>
                      <td
                        title="Draw"
                      >
                        D
                      </td>
                      <td
                        title="Lose"
                      >
                        L
                      </td>
                      <td
                        title="Goals For : Goals Against"
                      >
                        G
                      </td>
                      <td >+/-</td>
                      <td
                        title="Points"
                      >
                        P
                      </td>
                      <td > Form</td>
                      <td ></td>
                    </tr>
                  </thead>
                  <tbody >

                    {data.map((item: any) => {
                      return (
                        <tr className="standings-row" key={item.team.id}>
                          <td className="standings-rank" >
                            {item.rank}
                          </td>
                          <td >

                            <img className="standings-logo"
                              src={item.team.logo} loading="lazy"
                            />
                          </td>
                          <td >
                            <span className="standing-name">{item.team.name}</span>

                          </td>
                          <td >
                            {item.all.played}
                          </td>
                          <td >
                            {item.all.win}
                          </td>
                          <td >
                            {item.all.draw}
                          </td>
                          <td >
                            {item.all.lose}
                          </td>
                          <td >
                            {item.all.goals.for}:{item.all.goals.against}
                          </td>
                          <td >
                            {item.goalsDiff}
                          </td>
                          <td >{item.points}</td>
                          <td >
                            <div className="standing-form">

                              {item.form?.split("").map((letter: string, index: number) => {
                                return (
                                  <span
                                    key={index}
                                    id={letter}
                                    className={"wg_form" + " " + "wg_form_" + letter}
                                  >
                                    {letter.toUpperCase()}
                                  </span>
                                )
                              })}

                            </div>
                          </td>
                          <td className="info">
                            {item.description &&
                              <span
                                className="infoSpan"
                                title={item.description}>?</span>}
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
    </>
  );
}

