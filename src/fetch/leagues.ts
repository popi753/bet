import React from "react";


type league = {
  leagueId: number,
  name: string,
  logo: string,
  country: string,
}




type onFetchLeagueProps = {
  setLeagues : React.Dispatch<React.SetStateAction<league[]>>,
  id : number
}

export async function onFetchLeague({setLeagues, id}:onFetchLeagueProps) {

  try {
      const response = await fetch(import.meta.env.VITE_LEAGUES+id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.ok)
      if (!response.ok) {
        console.log("something went wrong")
        throw "something went wrong";
      }

      const result = await response.json()
      setLeagues(result)
      

  } catch (error) {
    console.error("this is error:  "+error)
    window.alert(error+"/try later")
  }

}

export type ranking = {
  rank: number;
  id: number;
  name: string;
  logo: string;
  description: string | null;
};
export async function onFetchTeams(leagueId:number,queryClient:any): Promise<ranking[]> {

  const token = window.localStorage.getItem("token")

  let headers = {}

  if (token) {
    headers = {
      "Content-Type": "application/json",
      "authorization": "Bearer "+ token,
    }
  }else{
    headers = {
      "Content-Type": "application/json",
    }
  }
  

  try {
    
      const response = await fetch(import.meta.env.VITE_LEAGUES+"teams/"+leagueId,
        {
          method: "GET",
          headers: headers,
        }
      );
      console.log(response.ok)
      if (!response.ok) {
        console.log("something went wrong")
        throw "something went wrong";
      }
      const result = await response.json()
      result.message && window.alert(result.message)

      

      if ("teams" in result) {
        // queryClient.setQueryData(["ranking"+leagueId], [])
        queryClient.setQueryData(["ranking"+leagueId], result.teams.map((element:any, index:number)=>{
          return {
                      rank: index + 1,
                      id: 0,
                      name: "",
                      logo: "",
                      description: element.description,
                    };
        }))
        return (result.teams.map((element:ranking)=>{
            return {...element,
                    rank : 0,
                    description: null}
        }))
      }else if ("ranking" in result){
        queryClient.setQueryData(["ranking"+leagueId], result.ranking)
        return []
      }
      else{
        return(result.teams)
      }


      

  } catch (error: any) {
    console.error("this is error:  ", error);
    window.alert(error + "/try later");
    throw new Error(error)
  }

}



export type standing = {

  rank: number,
  team: {
    id: number,
    name: string,
    logo: string
  },
  points: number,
  goalsDiff: number,
  group: string,
  form : string,

  // status: string,

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
  
  // home: {
  //   played: number,
  //   win: number,
  //   draw: number,
  //   lose: number,
  //   goals: {
  //     for: number,
  //     against: number
  //   }
  // },

  // away: {
  //   played: number,
  //   win: number,
  //   draw: number,
  //   lose: number,
  //   goals: {
  //     for: number,
  //     against: number
  //   }
  // },
  // update: string

}



export async function onFetchLeagueStandings(league:number): Promise<standing[]> {
  

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/standings?league=${league}&season=2024`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": import.meta.env.VITE_APIKEY,
        },
        redirect: "follow",
      }
    );
    console.log(response.ok);
    if (!response.ok) {
      console.log("something went wrong");
      throw "something went wrong";
    }



    const result = await response.json();

    

    if (result.errors.requests || result.errors.length) {
        console.log(result.errors)
        throw result.errors.requests
    }

    
    
    return(result.response[0].league.standings[0].map((item:any)=>{
      return({
        rank : item.rank,
        team : item.team,
        points : item.points,
        goalsDiff : item.goalsDiff,
        form : item.form,
        description : item.description,
        all   : item.all,
      })
    }));

   
  } catch (error :any ) {
    console.error("this is error:  ", error);
    window.alert(error + "/try later");
    throw new Error(error)
  }
}


export type topPlayer = {
  id: number,
  name: string,
  photo: string,
  teamLogo: string,
  minutes: number,
  lineups: number,
  substitutes: number,
  goals: number,
  assists: number,
}
  
export async function onFetchStats(league:number, endpoint:string): Promise<topPlayer[]>  {

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/players/${endpoint}?league=${league}&season=2024`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": import.meta.env.VITE_APIKEY,
        },
        redirect: "follow",
      }
    );
    console.log(response.ok);
    if (!response.ok) {
      console.log("something went wrong");
      throw "something went wrong";
    }

    
    const result = await response.json();

    if (result.errors.requests || result.errors.length) {
      console.log(result.errors)
      throw result.errors.requests
  }


    const arr = result.response.map((item: any)=>{
      return {
          id :item.player.id,
          name :item.player.name,
          photo :item.player.photo,
          teamLogo : item.statistics[0].team.logo,
          goals : item.statistics[0].goals.total,
          assists : item.statistics[0].goals.assists,
          lineups : item.statistics[0].games.lineups,
          substitutes : item.statistics[0].substitutes.in,
          minutes : item.statistics[0].games.minutes,


      }
    })

    return(arr);

   
  } catch (error : any) {
    console.error("this is error:  ", error);
    window.alert(error + "/try later");
    throw new Error(error)
  }
}



type onFetchFixturesProps = {
  league: number         
  endpoint  : string
  queryClient: any
};

type fixture = {
  fixture: {
          id: number,
          referee: string | null,
          timezone: string,
          date: string,
          timestamp: number,
          periods: {
                  first: number | null,
                  second: number | null
          },
          venue: {
                  id: number | null,
                  name: string | null,
                  city: string | null
          },
          status: {
                  long: string,
                  short: string,
                  elapsed: number | null
          }
  },
  league: {
          id: number,
          name: string,
          country: string,
          logo: string,
          flag: string | null,
          season: number,
          round: string
  },
  teams: {
          home: {
                  id: number,
                  name: string,
                  logo: string,
                  winner: boolean | null
          },
          away: {
                  id: number,
                  name: string,
                  logo: string,
                  winner: boolean | null
          }
  },
  goals: {
          home: number | null,
          away: number | null
  },
  score: {
          halftime: {
                  home: number | null,
                  away: number | null
          },
          fulltime: {
                  home: number | null,
                  away: number | null
          },
          extratime: {
                  home: number | null,
                  away: number | null
          },
          penalty: {
                  home: number | null,
                  away: number | null
          }
  }
}

export interface round {
  [name: string]: fixture[];
}

function setRounds(arr:fixture[]): round[][]{

  const results  : round [] = [] 
  const fixtures : round [] = []

  arr.map((element:fixture)=>{
    if(element.fixture.status.long == "Match Finished"){

      const index =  results.findIndex(ele => ele[element.league.round])

      index > -1
                ? 
                results[index][element.league.round].push(element)
                : 
                results.push({ [element.league.round] :[element]});
    }else{
      const index =  fixtures.findIndex(ele => ele[element.league.round])

      index > -1
                ? 
                fixtures[index][element.league.round].push(element)
                : 
                fixtures.push({ [element.league.round] :[element]})
  }
}
)
  

  return [results.toReversed(), fixtures]

}

export async function onFetchFixtures({league,endpoint,queryClient}:onFetchFixturesProps): Promise<round[]> {
  

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?&league=${league}&season=2024&`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": import.meta.env.VITE_APIKEY,
        },
        redirect: "follow",
      });

    console.log(response.ok);
    if (!response.ok) {
      console.log("something went wrong");
      throw "something went wrong";
    }

 

    const rawResult = await response.json();

    if (rawResult.errors.requests || rawResult.errors.length) {
      console.log(rawResult.errors)
      throw rawResult.errors.requests
    }
    
    const result = rawResult.response


    const [results, fixtures] = setRounds(result)

      
      
      if(endpoint == "results"){
        queryClient.setQueryData(["fixtures"+league], fixtures)
        return results
      }else if (endpoint == "fixtures") {
        queryClient.setQueryData(["results"+league], results)
        return fixtures
      }else{
        console.log("no type")
        throw "sometinh went wrong";

      }



   
  } catch (error :any ) {
    console.error("this is error:  ", error);
    window.alert(error + "/try later");
    throw new Error(error)
  }


}


export type leaderboard = {
  username : string,
  points : number,
}




export async function onFetchLeaderboard(leagueId:number): Promise<leaderboard[]> {
  

  try {
    
      const response = await fetch(import.meta.env.VITE_LEAGUES+"leaderboard/"+leagueId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.ok)
      if (!response.ok) {
        console.log("something went wrong")
        throw "something went wrong";
      }
      const result = await response.json()



      return(result)


      

  } catch (error: any) {
    console.error("this is error:  ", error);
    window.alert(error + "/try later");
    throw new Error(error)
  }

}