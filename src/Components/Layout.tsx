import {  useContext, useEffect, useRef} from "react";
import { UserContext } from "../App";
import profile from "../assets/profile.svg";
import {Outlet, Link} from "react-router-dom"

import { onLogout } from "../fetch/auth";

import "../styles/layout.css"

type HeaderProps = {
    dialogRef: React.RefObject<HTMLDialogElement>
}


export default function Layout({ dialogRef }: HeaderProps) {


        const profileRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClick (e: Event) {
          if (profileRef.current?.lastElementChild?.hasAttribute("open") && !profileRef.current.contains(e.target as Node)) {
            profileRef.current.lastElementChild.removeAttribute("open")
          }
        }
        window.addEventListener('click', handleClick);
        return ()=>window.removeEventListener('click', handleClick)
      }, []);

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
                    <button 
                    onClick={(e)=>{console.log("clicked")}}
                    >
                        click me
                    </button>


                    {user ?
                    <div className="profile-div" ref={profileRef}>
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