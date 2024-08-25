
import {onFetchTeams, onSaveFantasyTeams } from "./fetch";

import { useQuery} from "@tanstack/react-query";

import bin from "../assets/bin.svg";

import { UserContext } from "../App";

import "../styles/fantasy.css";
import { useLayoutEffect, useRef, useState, useContext} from "react";




type standing = {
  rank: number,
  
    id: number,
    name: string,
    logo: string
  
}


export default function Fantasy({id}: {id:number}) {

    const [user] = useContext<any>(UserContext)



    const fantasyRef = useRef<HTMLDivElement>(null!)

    const[standings, setStandings] = useState<standing[]>([])

    const [selectedRank, setSelectedRank] = useState<number>();


    function handleClick(rank:number) {
        console.log("clicked")
        setSelectedRank(rank);
        (data && fantasyRef) ? fantasyRef?.current.classList.add("shown"): null;
    }


    function handleChoose(TeamId:number) {
        setStandings(standings.map((standing:any, index:number)=>{
                return (
                    selectedRank? (
                       
                        standing.rank == selectedRank ? {...data.find((ele:any)=>ele.id == TeamId), rank:selectedRank} : standing

                    ) :
                    index == standings.findIndex(element=>element.id==0) ? {...data.find((ele:any)=>ele.id == TeamId), rank:index+1} : standing
                )
        }))
        setSelectedRank(0)
        data.splice(data.findIndex((ele:any)=>ele.id == TeamId), 1)
    }

    function handleDelete(TeamId:number) {
        data.unshift(standings.find((ele:any)=>ele.id == TeamId))
        setStandings(standings.map((standing:any, index:number)=>{
            return standing.id == TeamId ? {
                rank: index+1,
                id : 0,
                name:"",
                logo: ""
        } : standing
        }))


    }


    function handleSave() {
        !user  ? (
             alert("please authentificate to save")
        ) : onSaveFantasyTeams(standings,id)

    }




    const {data} = useQuery({
        queryKey: [`fantasy${id}`], 
        queryFn: ()=>onFetchTeams(id),
        staleTime: 1000*60*5,
})





useLayoutEffect(() => {
    if (data) {
        setStandings(data.map((_element:any,index:number)=>{
            return{
                    rank: index+1,
                    id : 0,
                    name:"",
                    logo: ""
            }
        }))
    }
}, [data])



    

  return (
    <>
      <div className="fantasy-container">
      <div>
            {standings && (
              <table className="standings-table" >
                <thead></thead>
                <tbody className="standings-tbody">
                  {/* signs row */}
                  <tr className="standings-row">
                    <td
                      className="standings-rank"
                    >#</td>
                    <td
                      colSpan={2}
                    ></td>
                        <td></td>
                    
                  </tr>
                  {standings.map((item:any, index:number) => {
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
                        className="standing-team-name">{item.name || "choose team"}</span>
                           
                          </td>
                          
                        <td>

                        {item.id ? (
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                    <img src={bin} alt="delete" />
                </button>
            ) : null}

                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          {data?.length ?
          <div 
          className="fantasy-div"
           ref={fantasyRef}>
            <table>
                <thead></thead>
                <tbody className="standings-tbody">
                <tr className="standings-row">
                            <td></td>
                        </tr>
                    {data?.map((item:any)=>{
                        
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
    </>
  );
}
