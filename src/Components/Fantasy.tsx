
import {onFetchTeams, onSaveFantasyTeams } from "./fetch";

import { useMutation, useQuery} from "@tanstack/react-query";

import bin from "../assets/bin.svg";

import { UserContext } from "../App";

import "../styles/fantasy.css";
import { useEffect, useRef, useState, useContext} from "react";




type standing = {
    rank: number,
    id: number,
    name: string,
    logo: string,
    description : string | null
  
}




export default function Fantasy({id}: {id:number}) {

    const [user] = useContext<any>(UserContext)

console.log(import.meta.env.VITE_BET)
    const fantasyRef = useRef<HTMLDivElement>(null!)

    const [rankings, setRankings] = useState<standing[]>([])

    const [teams, setTeams] = useState<any[]>([])

    const [selectedRank, setSelectedRank] = useState<number>();

    const [text, setText] = useState<string>("");

    const [btn, setBtn] = useState<string>("save");


    function handleClick(rank:number) {
        setSelectedRank(rank);
        (teams && fantasyRef) ? fantasyRef?.current.classList.add("shown"): null;
    }


    function handleChoose(TeamId:number) {
        setRankings(rankings.map((standing:standing, index:number)=>{
                return (
                    selectedRank? (
                        standing.rank == selectedRank ? {...teams.find((ele:any)=>ele.id == TeamId),description:standing.description, rank:selectedRank} : standing

                    ) :
                    index == rankings.findIndex(element=>element.id==0) ? {...teams.find((ele:any)=>ele.id == TeamId),description:standing.description, rank:index+1} : standing
                )
        }))
        setSelectedRank(0)
        teams.splice(teams.findIndex((ele:any)=>ele.id == TeamId), 1)
    }

    

    function handleRandom() {
              setRankings(rankings.map((standing:standing, index:number)=>{
                return (
                      standing.id == 0 ? {...teams.shift(),description:standing.description, rank:index+1} : standing
                )
        })) 
    }

    function handleDelete(TeamId:number) {
        teams?.unshift({...rankings.find((ele:any)=>ele.id == TeamId), description:null})

        setRankings(rankings.map((standing:standing)=>{
            return standing.id == TeamId ? {
                rank: standing.rank,
                id : 0,
                name:"",
                logo: "",
                description : standing.description
        } : standing
        }));

        (isSuccess || !btn) && setBtn("update")

    }


    async function handleSave() {


      rankings.some(({rank,name,id,logo})=>{return !name || !rank || !id || !logo}) ?
              alert("please fill all the fields") :
      !user  ? (
             alert("please authentificate to save")
        ) : mutate({rankings,id})


    }



    const {data, isLoading} = useQuery({
        queryKey: [`fantasy${id}`], 
        queryFn: ()=>onFetchTeams(id),
        staleTime: 1000*60*5,
})

// ({rankings,id})

    const 
    {isPending,
     isSuccess,
     mutate}
     = useMutation({
        mutationFn: onSaveFantasyTeams,
        mutationKey: [`savefantasy${id}`],
        onSuccess: () => setText("your rankings") ,
        onError: () => console.log("error"),
        onMutate: () => console.log("mutate"),
        onSettled: () => setBtn(""),
    })



useEffect(() => {


  if (data?.ranking) {
      
      setRankings(data.ranking)
  }else if(data?.teams){
    setRankings(data.teams.map((element:any,index:number)=>{
      return{
              rank: index+1,
              id : 0,
              name:"",
              logo: "",
              description: element.description
      }
  }))
    setTeams(data.teams)
  }
  data?.message == "already have fantasy" && (setBtn(""), setText("your ranking"))
  

}, [data])




    

  return (
    <>
      <div className="fantasy-container">
              <div>
                
                                    <div>
                                          {rankings && (
                                            <table className="standings-table" >
                                              <thead>
                                                      <tr className="head-row">
                                                          <td
                                                            className="standings-rank"
                                                          >#</td>
                                                          <td
                                                            colSpan={2}
                                                          >
                                                            {text}
                                                          </td>
                                                              <td></td>
                                                              <td></td>

                        
                                                        </tr>

                                              </thead>
                                              <tbody className="standings-tbody">
                                                
                                                {rankings.map((item:any, index:number) => {
                                                  return (
                                                    <tr className="standings-row" key={index}>
                                                      <td className="standings-rank" >
                                                        {item.rank}
                                                      </td>
                                                      <td >
                
                                                      <img
                                                      style={!item.logo ? { filter: "invert(100%" } : {}}
                                                      className="standings-logo"
                                                      src={item.logo || "https://cdn-icons-png.flaticon.com/512/5042/5042057.png"} loading="lazy"
                                                      />
                                                        </td>
                                                        <td >
                
                                                      <span
                
                                                      onClick={()=>handleClick(item.rank)}
                                                      className="standing-name">{item.name || "choose team"}</span>
                
                                                        </td>
                
                                                      <td>
                
                                                      {item.id ? (
                                              <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                                                  <img src={bin} alt="delete" />
                                              </button>
                                          ) : null}
                
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
                
                
                                        {teams?.length ?
                                        <div
                                        className="fantasy-div"
                                        ref={fantasyRef}>
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
                                              
                                                        
                                                {teams?.map((item:any)=>{
                                                    return(
                                                        <tr className="standings-row" key={item.name}>
                                                        <td >
                                                      <img
                                                      onClick={()=>handleChoose(parseInt(item.id))}
                                                      className="standings-logo"
                                                      src={item.logo} title={item.name} loading="lazy"
                                                      />
                                                        </td>
                                                        </tr>
                                                        )
                                                                    
                                                                                                      })}
                
                
                                              </tbody>
                                          </table>
                                      </div>: null}
                                      
              </div>

                                            
        {(isLoading || isPending) ? <div>
            <button className="fantasy-save-btn"
            >loading ...</button>
          </div>:  
        teams.length == 1 ? <div>
            <button className="fantasy-save-btn"
              onClick={handleRandom}
            >fill </button>
          </div> :
          teams.length>1 ? <div>
            <button className="fantasy-save-btn"
              onClick={handleRandom}
            >fill randomly</button>
          </div>
            :
            !btn ? null :
              !teams.length ? <div>
                <button className="fantasy-save-btn"
                  onClick={handleSave}
                >{btn}</button>
              </div>
                : null
        }   

      </div>
        
    </>
  );
}
