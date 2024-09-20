import { ReactNode, useContext} from "react";
import { UserContext } from "../App";
import profile from "../assets/profile.svg";
import {Outlet, Link} from "react-router-dom"

import { onLogout } from "./fetch";

import "../styles/layout.css"

type HeaderProps = {
    children: ReactNode,
    dialogRef: React.RefObject<HTMLDialogElement>
}


export default function Layout({ children, dialogRef }: HeaderProps) {

    

    const [user, setUser, balance] = useContext<any>(UserContext)


    return (
        <>
        <header className="header">
            
            <nav className="header-nav">
            
                <div className="header-div">
                    <Link to={"/"}>
                        <div>
                            hello world
                        </div>
                    </Link>
                    {children}


                    {user ?
                    <div className="profile-div">
                        <span className="profile-info">
                            {user}
                        </span>
                        <details>
                            <summary>
                                    <img src={profile} alt="" className="profile-icon"/>
                            </summary>
                                    <div className="profile-menu">
                                        <ul>
                                            <li>
                                                tokens:
                                                    <span className="profile-balance">{balance}</span>   

                                            </li>
                                            <li>
                                                        <span
                                                    onClick={async ()=>{
                                                        await onLogout()
                                                        await window.localStorage.removeItem("token")
                                                        await setUser("")
                                                        window.location.reload()
                                                    }}
                                                    >Log out</span>
                                            </li>
                                        </ul>
                                        
                                    </div></details>
                    </div>
                    
                : <div className="header-auth"
                onClick={() => { dialogRef.current?.showModal() }}>
                Sign in / Sign up
            </div>
                }

                

                </div>
            
        </nav>
        </header>
           <div className="main-container">
            
                           <Outlet/>
           </div>


        </>
    )
}