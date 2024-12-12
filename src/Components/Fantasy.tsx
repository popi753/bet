import { onFetchTeams, type ranking} from "../fetch/leagues";
import { onSaveFantasyTeams } from "../fetch/bet";

import { useMutation, useQueries,useQueryClient } from "@tanstack/react-query";

import bin from "../assets/bin.svg";

import { UserContext } from "../App";

import "../styles/fantasy.css";
import { useEffect, useRef, useState, useContext } from "react";



// betting tips (baloteli yellow, espanetis mmeti dartyma) calke page

//shemdegshi root-dan daiwye responsive font-sizet +h1,2,3,4,5,6

//always make loading and error pages for everything for every request

//fantasy createdAt and updatedAt is wrong not working for each league creation and update


export default function Fantasy({ leagueId }: { leagueId: number }) {
  const [user] = useContext<any>(UserContext);

  const fantasyRef = useRef<HTMLDivElement>(null!);

  const [rankings, setRankings] = useState<ranking[]>([]);

  const [teams, setTeams] = useState<ranking[]>([]);

  const [selectedRank, setSelectedRank] = useState<number>();

  const [text, setText] = useState<string>("");

  const [btn, setBtn] = useState<string>("save");


  function handleClick(rank: number) {
    setSelectedRank(rank);
    teams && fantasyRef ? fantasyRef?.current.classList.add("shown") : null;
  }


  function handleChoose(TeamId: number) {

    const team = teams.find((ele: ranking) => ele.id == TeamId)

    if (!(team == undefined)) {
      setRankings( 
        rankings.map((ranking: ranking, index: number) => {
          return !selectedRank
                              ?    index == rankings.findIndex((element) => element.id == 0)
                                                                  ? {
                                                                        ...team,
                                                                        description: ranking.description,
                                                                        rank: ranking.rank,
                                                                      }
                                                                      : ranking
                    : selectedRank == ranking.rank  ?  {
                                                                ...team,
                                                                description: ranking.description,
                                                                rank: selectedRank,
                                                              }
                                                              : ranking;
        
         
          // return selectedRank
          //                     ?     ranking.rank == selectedRank
          //                                                         ? {
          //                                                               ...team,
          //                                                               description: ranking.description,
          //                                                               rank: selectedRank,
          //                                                             }
          //                                                             : ranking
          //                     : index == rankings.findIndex((element) => element.id == 0)
          //                                                     ? {
          //                                                       ...team,
          //                                                       description: ranking.description,
          //                                                       rank: index + 1,
          //                                                     }
          //                                                     : ranking;
        })
      );
    }
    
    

    if (!selectedRank) {
      setTeams(
        teams.filter((ele) => {
          return ele.id != TeamId;
        })
      );
    }else if (rankings[selectedRank-1].id !=0) {
      setTeams([{...rankings[selectedRank-1], description: null, rank:0}, ...teams.filter((ele) => {
        return ele.id != TeamId;
      })])
    }else{
      setTeams(
        teams.filter((ele) => {
          return ele.id != TeamId;
        })
      );
    }

   
    setSelectedRank(0);
    
  }

  function handleRandom() {
    
    let num = teams.length;

    setRankings(
      rankings.map((element: ranking, index: number) => {
        if (element.id == 0) {
            let number = Math.ceil(Math.random()*num);
            let team = teams[number-1];
            teams.splice(number-1,1);
            num = num - 1
            return { ...team, description: element.description, rank: index + 1 }

        }else{
          return element
        }
        
      })
    );
    setTeams([])
  }


  function handleDelete(TeamId: number) {
    
    const team = rankings.find((ele: ranking) => ele.id == TeamId)

    team ? 
    setTeams([...teams,
                          {...team, description:null, rank:0}])
: null;

    
    setRankings(
      rankings.map((ranking: ranking) => {
        return ranking.id == TeamId
          ? {
            rank: ranking.rank,
            id: 0,
            name: "",
            logo: "",
            description: ranking.description,
          }
          : ranking;
      })
    );

    (isSuccess || !btn) && setBtn("update");
  }


  async function handleSave() {
    rankings.some(({rank,name,id,logo})=>{return !name || !rank || !id || !logo}) ?
            alert("please fill all the fields") :
    !user  ? (
           alert("please authentificate to save")
      ) :
    mutate({ rankings, leagueId });
  }




  const queryClient = useQueryClient();

  const [{ data:teamsData, isLoading, status},{data:rankingData}] = useQueries({queries : [

    {
      queryKey: ["teams" + leagueId],
      queryFn: () => onFetchTeams(leagueId, queryClient),
      staleTime: 1000 * 60 * 5,
      
    },

    {
      queryKey: ["ranking" + leagueId],
      queryFn: () => onFetchTeams(leagueId, queryClient),
      staleTime: 1000 * 60 * 5,
      enabled : false
    }
 
  ],
  // combine : (results) => {
  //   return {
  //     isLoading : results[0].isLoading || results[1].isLoading,
  //     isError : results[0].isError || results[1].isError
  //   }
  // }
    
  })


  useEffect(() => {
    if (status == "success") {
     
    setTeams(teamsData)
    setRankings(rankingData || []) ,
    !(rankingData?.some(({rank,name,id,logo})=>{return !name || !rank || !id || !logo})) && setBtn("")
    }
  },[teamsData,rankingData])

  
  
  const { isPending, isSuccess, mutate} = useMutation({
    mutationFn: onSaveFantasyTeams,
    mutationKey: [`savefantasy${leagueId}`],
    onError:   ()      => {console.log("mutationError")},
    onMutate:  ()      => {console.log("mutating")},
    onSettled: ()      => {console.log("settled")},
    onSuccess: ()      => {console.log("success"),setText("your rankings"),setBtn("")},

  });












  return (
    <>
      <div className="fantasy-container">
        {status == "error" ? (
          <div className="error">no information try later</div>
        ) : isLoading ? (
          <div className="wg_loader"></div>
        ) : status == "success" ? (
          <div>
            <div>
              {rankings.length ? (
                <table className="standings-table">
                  <thead>
                    <tr className="head-row">
                      <td className="standings-rank">#</td>
                      <td colSpan={4}>{text}</td>
                    </tr>
                  </thead>
                  <tbody className="standings-tbody">
                    {rankings.map((ranking: ranking, index: number) => {
                      return (
                        <tr className="standings-row" key={index}>
                          <td className="standings-rank">{ranking.rank}</td>
                          <td>
                            <img
                              style={
                                !ranking.logo ? { filter: "invert(100%" } : {}
                              }
                              className="standings-logo"
                              src={
                                ranking.logo ||
                                "https://cdn-icons-png.flaticon.com/512/5042/5042057.png"
                              }
                              loading="lazy"
                            />
                          </td>
                          <td>
                            <span
                              onClick={() =>
                                handleClick(ranking.rank)
                              }
                              className="standing-name"
                            >
                              {ranking.name || "choose team"}
                            </span>
                          </td>

                          <td>
                            {ranking.id ? (
                              <button
                                className="delete-btn"
                                onClick={() => handleDelete(ranking.id)}
                              >
                                <img src={bin} alt="delete" />
                              </button>
                            ) : null}
                          </td>
                          <td>
                            {ranking.description && (
                              <span
                                className="infoSpan"
                                title={ranking.description}
                              >
                                ?
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="wg_loader" />
              )}
            </div>

            {teams?.length ? (
              <div className="fantasy-div" ref={fantasyRef}>
                <table className="fantasy-table">
                  {/* <colgroup>
                                                  <col style={{"overflowY":"scroll"}}/>
                                                </colgroup> */}
                  <thead>
                    <tr className="head-row">
                      <td></td>
                    </tr>
                  </thead>
                  <tbody className="standings-tbody">
                    {teams?.map((team: ranking) => {
                      return (
                        <tr className="standings-row" key={team.id}>
                          <td>
                            <img
                              onClick={() => handleChoose(team.id)}
                              className="standings-logo"
                              src={team.logo}
                              title={team.name}
                              loading="lazy"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        ) : (
          <div>something went wrong</div>
        )}

        {status == "error" ? null : (
          <div className="btn-container">
            {isLoading || isPending ? (
              <button className="fantasy-save-btn">loading ...</button>
            ) : teams.length == 1 ? (
              <button className="fantasy-save-btn" onClick={handleRandom}>
                fill
              </button>
            ) : teams.length > 1 ? (
              <button className="fantasy-save-btn" onClick={handleRandom}>
                fill randomly
              </button>
            ) : !btn ? null : !teams.length ? (
              <button className="fantasy-save-btn" onClick={handleSave}>
                {btn}
              </button>
            ) : null}
          </div>
        )}
      </div>

    </>
  );
}
