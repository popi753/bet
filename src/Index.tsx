import { useEffect, useState, useRef, useContext } from 'react'
import { Routes, Route } from "react-router-dom";

import './index.css'

import Home from './pages/Home'
import Leagues from './pages/Leagues';
import Missing from './pages/Missing';

import Layout from './Components/Layout';
import Dialog from './Components/Dialog';

import { UserContext } from './App';



function Index() {

    const [user, _setUser] = useContext<any>(UserContext)

    const [render, setRender] = useState<boolean>(false)

    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        console.log("render")

    });




    return (

        <>




            {user ? null
                : <Dialog
                    dialogRef={dialogRef}>
                </Dialog>}



                <Routes>
                    <Route path="/" element={<Layout
                        children={<button
                            onClick={() => {
                                setRender(!render)
                            }}>render</button>}

                        dialogRef={dialogRef}
                    />}>
                        <Route index element={<Home />} />
                        <Route path="/leagues/:id/*" element={<Leagues/>} />


                </Route>
                
                <Route path="*" element={<Missing />} />
                     



                </Routes>

        </>
    )




}

export default Index