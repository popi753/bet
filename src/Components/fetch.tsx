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
            throw("something went wrong")
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
            throw("something went wrong")
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

export   async function onValidate({token, setUser, setBalance}:onValidateProps) {
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
        throw("something went wrong")
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

type onFetchLeaguesProps = {
    setLeagues : React.Dispatch<React.SetStateAction<any[]>>,
}


export async function onFetchLeagues({setLeagues}:onFetchLeaguesProps) {

    try {
        const response = await fetch(import.meta.env.VITE_LEAGUES,
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
          throw("something went wrong")
        }
  
        const result = await response.json()

        setLeagues(result)
        
  
    } catch (error) {
      console.error("this is error:  "+error)
      window.alert(error+"/try later")
    }

}


type onFetchStatsProps = {
  id              : number | undefined,
  setLeague       : React.Dispatch<React.SetStateAction<any>>,
}

export async function onFetchStats({id,setLeague}:onFetchStatsProps) {

  try {
      const response = await fetch(import.meta.env.VITE_LEAGUES+"stats/"+id,
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
        throw("something went wrong")
      }

      const result = await response.json()
      setLeague(result)
      

  } catch (error) {
    console.error("this is error:  "+error)
    window.alert(error+"/try later")
  }

}
