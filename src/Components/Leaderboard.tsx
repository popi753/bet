import { onFetchLeaderboard, type leaderboard} from "../fetch/leagues";

import { useQuery } from "@tanstack/react-query";

import "../styles/leaderboard.css";




export default function Leaderboard({leagueId}:{leagueId:number}) {



      const { data, isError, isLoading} = useQuery<leaderboard[]>({
        queryKey: ["leaderboard" + leagueId],
        queryFn: () => onFetchLeaderboard(leagueId),
        staleTime: 1000 * 60 * 5,
        retry: 1,
        retryDelay: 2000,
        retryOnMount : true,
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus : false
      })
    


    

    return(
        <>
            <div className="leaderboard-container">

                    {isError ? <div className="error">no information try later</div> :
                        isLoading ?
                            <div className="wg_loader"></div> :
                            !(data?.length)  ? <div>no information</div> :
                            data ? 
                            <div>

                            <table className="stats-table">

                              <thead>
                                <tr className="head-row">
                                  <td
                                    className="standings-rank"
                                  >#</td>
                                  <td
                                    colSpan={1}
                                  ></td>
                                  
                                  <td
                                    title="Points"
                                  >
                                    P
                                  </td>
                                </tr>
                              </thead>
                              <tbody >
            
                                {data.map((item: leaderboard, index : number) => {
                                  return (
                                    <tr className="standings-row" key={item.username}>
                                      <td className="standings-rank" >
                                        {index + 1}
                                      </td>
                                      <td >
                                        <span className="standing-name">{item.username}</span>
                                      </td>
                                   
                                      <td >{item.points}</td>
                                      
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
            
            
                          </div>
                            
                            
                            :   
                            <div>something went wrong</div>}
            </div>

        </>
    )
}