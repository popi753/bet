import React from "react";

type onRegisterProps = {
    username            : string,
    setUsername         : React.Dispatch<React.SetStateAction<string>>,
    password            : string,
    setPassword         : React.Dispatch<React.SetStateAction<string>>,
    setUsernameError    : React.Dispatch<React.SetStateAction<string>>,
    setUser             : React.Dispatch<React.SetStateAction<string>>,
    close               : () => void,
    e                   : React.FormEvent<HTMLFormElement>,
}

export async function onRegister({username,setUsername,password,setPassword,setUsernameError,setUser,close,e}:onRegisterProps) {
    e.preventDefault();

    if (username.length < 8 || username.length > 20 || password.length < 8) {
        return;
    }

    try {
        const response = await fetch(import.meta.env.VITE_AUTH + "register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        console.log(response.ok)
        if (!response.ok) {
            console.log("something went wrong")
            
        }
        const result = await response.json();


        
         if (result.error?.code == "P2002") {
            setUsernameError("username is already taken")
            return
         }
        // result.error?.code == "P2002" && setUsernameError("username is already taken")

        close()
        setUser(result.username)
        setUsername("")
        setPassword("")
        window.localStorage.setItem("token", result.token);
        
        

    } catch (error) {
        window.alert(error + "/try later");
        console.warn("this is error:   " + error);
    }

}

type onLoginProps = {
    username             : string,
    setUsername          : React.Dispatch<React.SetStateAction<string>>,
    setUsernameError     : React.Dispatch<React.SetStateAction<string>>,
    password             : string,
    setPassword          : React.Dispatch<React.SetStateAction<string>>,
    setPasswordError     : React.Dispatch<React.SetStateAction<string>>,
    setUser              : React.Dispatch<React.SetStateAction<string>>,
    close                : () => void,
    e                    : React.FormEvent<HTMLFormElement>,
}

export async function onLogin({username,setUsername,setUsernameError,password,setPassword,setPasswordError,setUser,close,e}:onLoginProps) {
    e.preventDefault();

    if (username.length < 8 || username.length > 20 || password.length < 8) {
        return;
    }

    try {
        const response = await fetch(import.meta.env.VITE_AUTH + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        console.log(response.ok)
        if (!response.ok) {
            console.log("something went wrong")
            
        }
        const result = await response.json();

        if (result.error?.code == "P1") {
            setUsernameError("username doesn't exists")
            return
         }else if (result.error?.code == "P2") {
            setPasswordError("password is incorrect")
            return
         }


        

        close()
        setUser(result.username)
        setUsername("")
        setPassword("")
        window.localStorage.setItem("token", result.token);
        
        

    } catch (error) {
        window.alert(error + "/try later");
        console.warn("this is error:   " + error);
    }

}



type onValidateProps = {
    token                 : string | null,
    setUser               : React.Dispatch<React.SetStateAction<string>>,
    setBalance            : React.Dispatch<React.SetStateAction<Number>>,
}

export async function onValidate({token, setUser, setBalance,}:onValidateProps) {
  
    try {
      const response = await fetch(import.meta.env.VITE_AUTH+"validate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer "+ token,
          },
        }
      );
      console.log(response.ok)
      if (!response.ok) {
        console.log("something went wrong")
        
      }



      const result = await response.json()
      if (result == "jwt malformed") {
        window.localStorage.removeItem("token")
        window.alert("wrong token")
        return
      }
      if (result.error?.code == "P3") {
        window.localStorage.removeItem("token")
        window.alert("wrong token")
        return
     }
      
      setUser(result.username)
      setBalance(result.balance)

      

  } catch (error) {
    console.error("this is error:  "+error)
    window.alert(error+"/try later")
  }
  }


export async function onLogout() {
  try {
    const response = await fetch(import.meta.env.VITE_AUTH+"logout",
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
      
    }

    const result = await response.json()
    
    console.log(result)
    

} catch (error) {
  console.error("this is logout error:  "+error)
  window.alert(error+"/try later")
}
}



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
        
      }

      const result = await response.json()
      setLeagues(result)
      

  } catch (error) {
    console.error("this is error:  "+error)
    window.alert(error+"/try later")
  }

}




export async function onFetchLeagueStandings(league:number) {
  

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
    return(result.response[0].league.standings[0].map((item:any)=>{
      return({
        all   : item.all,
        description : item.description,
        form : item.form,
        goalsDiff : item.goalsDiff,
        points : item.points,
        rank : item.rank,
        team : item.team,
      })
    }));



   
  } catch (error) {
    console.error("this is error:  ", error);
    window.alert(error + "/try later");
  }
}


export async function onFetchTeams(id:number) {

  try {
      const response = await fetch(import.meta.env.VITE_LEAGUES+"teams/"+id,
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
        
      }

      const result = await response.json()
      result.message && window.alert(result.message)
      return(result)
      

  } catch (error) {
    console.error("this is error:  "+error)
    window.alert(error+"/try later")
  }

}

type onSaveFantasyTeamsProps = {
  rankings: { rank: number; id: number; name: string; logo: string; }[],
  id: number, 
}


export async function onSaveFantasyTeams({rankings:ranking,id:leagueId,}:onSaveFantasyTeamsProps) {

  const token = window.localStorage.getItem("token")

  try {
      const response = await fetch(import.meta.env.VITE_BET + "fantasy", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer "+ token,
          },
          body: JSON.stringify({leagueId,ranking}),
      });
      console.log(response.ok)
      if (!response.ok) {
          console.log("something went wrong")
          
      }
      const result = await response.json();

      console.log(result)
      window.alert(result.message)
      return result.message

  } catch (error) {
      window.alert(error + "/try later");
      console.warn("this is error:   " + error);
  }

}


type onFetchStatsProps = {
  league: any; 
  endpoint: string;
};


  
export async function onFetchStats({
  league,
  endpoint,
}: onFetchStatsProps) {
  

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
    const arr = result.response.map((item: any)=>{
      return {
          id :item.player.id,
          name :item.player.name,
          photo :item.player.photo,
          goals : item.statistics[0].goals.total,
          assists : item.statistics[0].goals.assists,
          lineups : item.statistics[0].games.lineups,
          substitutes : item.statistics[0].substitutes.in,
          minutes : item.statistics[0].games.minutes,


      }
    })

    return(arr);



   
  } catch (error) {
    console.error("this is error:  ", error);
    window.alert(error + "/try later");
  }
}


  

