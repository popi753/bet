import { useState, createContext,} from 'react'
import './App.css'

import { BrowserRouter } from 'react-router-dom'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


import { onValidate } from './Components/fetch'

import Index from "./Index"

const queryClient = new QueryClient()


function App() {


  const token = window.localStorage.getItem("token")


  
  const [user, setUser] = useState<string>("")
  const [balance, setBalance] = useState<Number>(0)

  
      
  if (!user && token){

    onValidate({token, setUser, setBalance})

    console.log("fetched token")

  }
     


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={[user, setUser, balance, setBalance]}>
          <BrowserRouter>
            <Index />
          </BrowserRouter>
        </UserContext.Provider>
        <ReactQueryDevtools initialIsOpen={false} />

      </QueryClientProvider>
    </>
  );

}

type contextType = null | [
  user: string,
  setUser: React.Dispatch<React.SetStateAction<string>>,
  balance: Number,
  setBalance: React.Dispatch<React.SetStateAction<Number>>,
]

export const UserContext = createContext<contextType>(null)

export default App
