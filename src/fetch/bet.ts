


type onSaveFantasyTeamsProps = {
    rankings: { rank: number; id: number; name: string; logo: string; }[],
    leagueId: number, 
  }
  
  
  export async function onSaveFantasyTeams({rankings:ranking,leagueId,}:onSaveFantasyTeamsProps) {
  
    const token = window.localStorage.getItem("token")
    
    
    
    try {
        if (!token) {
            throw "you are not authorized"
        }
        
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
            const result = await response.json();
            console.log(result)
            throw "something went wrong";
        }

        const result = await response.json();
  
        console.log(result)
        window.alert(result.message)
        return result.message
  
    } catch (error : any) {
        window.alert(error + "/try later");
        console.warn("this is error:   " + error);
        throw new Error(error)
    }
  
  }