
import { onFetchLeagueStandings } from "./fetch";

import { useQuery} from "@tanstack/react-query"

import "../styles/standings.css";



interface standing  {
    rank: number,
    team: {
      id: number,
      name: string,
      logo: string
    },
    points: number,
    goalsDiff: number,
    group: string,
    form: string,
    status: string,
    description: string | null,
    all: {
      played: number,
      win: number,
      draw: number,
      lose: number,
      goals: {
        for: number,
        against: number
      }
    },
    home: {
      played: number,
      win: number,
      draw: number,
      lose: number,
      goals: {
        for: number,
        against: number
      }
    },
    away: {
      played: number,
      win: number,
      draw: number,
      lose: number,
      goals: {
        for: number,
        against: number
      }
    },
    update: string
}




export default function Standings({id}: {id:number}) {

  

    const {data} = useQuery<standing[]>({
                queryKey: [id], 
                queryFn: ()=>onFetchLeagueStandings(id),
                staleTime: 1000*60*5,
})
    


  return (
    <>
      <div className="standings-container">
      <div
            id="mydiv"
            data-show-errors="false"
            data-show-logos="true"
            className={data? "" : "wg_loader"}
          >
            {data && (
              <table className="standings-table" id="wg-football-standings">
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
                <tbody className="standings-tbody">
                  
                  {data.map((item:any) => {
                    return (
                      <tr className="standings-row" key={item.team.id}>
                        <td className="standings-rank" >
                          {item.rank}
                        </td>
                        <td >
                          
                        <img  className="standings-logo"
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
                          <div className="standings-forms">
                            
                            {item.form?.split("").map((letter:string,index:number)=>{
                              return (
                              <span
                                key={index}
                                id={letter}
                                className={"wg_form"+" "+"wg_form_"+letter}
                                >
                                    {letter.toUpperCase()}
                              </span>
                            )
                            })}
                            
                          </div>
                        </td>
                        <td >
                          {item.description && 
                          <span 
                          className="info" 
                          title={item.description}>?</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          
          
        </div>
    </>
  );
}
