import {useRef, useContext } from 'react'
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

    const dialogRef = useRef<HTMLDialogElement>(null)

   




    return (

        <>




            {user ? null
                : <Dialog
                    dialogRef={dialogRef}>
                </Dialog>}



                <Routes>
                    <Route path="/" element={<Layout
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