import { useState, createContext} from 'react'
import './App.css'

import { BrowserRouter } from 'react-router-dom'


import { onValidate}  from "./Components/fetch";



import Index from "./Index"

// type User = null | {
//   name: string,
// }


function App() {

 

  const token = window.localStorage.getItem("token")




  
  const [user, setUser] = useState<string>("")
  const [balance, setBalance] = useState<Number>(0)
  



  if (!user && token){
    // validate()

  onValidate({token, setUser, setBalance})



    console.log("fetched")

  }


  return(
    <>
<UserContext.Provider value={[user, setUser, balance,setBalance]}>
  
        <BrowserRouter>
        
            <Index/>
            
        </BrowserRouter>
  
</UserContext.Provider>
    </>
  )

}

type contextType = null | [
  user: string,
  setUser: React.Dispatch<React.SetStateAction<string>>,
  balance: Number,
  setBalance: React.Dispatch<React.SetStateAction<Number>>
]

export const UserContext = createContext<contextType>(null)

export default App
