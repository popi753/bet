import { useState, useContext, useEffect } from "react";
import "../styles/auth.css";
import Input from "./Input";
import cirxleX from "../assets/circle-xmark.svg";
import eye from "../assets/eye.svg";
import eyeSlash from "../assets/eyeSlash.svg";


import { onRegister, onLogin }  from "../fetch/auth";

import { UserContext } from "../App";


type authProps = {
    haveAcc     : boolean;
    setHaveAcc  : React.Dispatch<React.SetStateAction<boolean>>;
    close       : () => void;
};

// type contextType = null | [
//     user: string,
//     setUser: React.Dispatch<React.SetStateAction<string>>
//   ]

export default function Auth({haveAcc, setHaveAcc, close }: authProps) {

    



    useEffect(() => {
        setUsernameError(username.length < 8 ? "more than 8 characters": username.length > 20 ? "less than 20 characters" : "");
        setPasswordError(password.length < 8 ? "more than 8 characters" : "");
    },[haveAcc])



    const [user,setUser] = useContext<any>(UserContext)


    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [usernameError, setUsernameError] = useState<string>(" ");
    const [passwordError, setPasswordError] = useState<string>(" ");

    

    return (
        <>
            <div className="auth-box">
                <form action="POST" tabIndex={0} onSubmit={(e) => 
                    {haveAcc ? 
                        onLogin({username, setUsername,setUsernameError, password, setPassword, setPasswordError,  setUser, close, e, })
                :           onRegister({username, setUsername, password, setPassword, setUsernameError, setUser,close, e, })
                           
                    }
                    }>
                    <div className="auth-form">
                        <img
                            src={cirxleX}
                            className="cirxleX"
                            onClick={() => {
                                close();
                            }}
                        />

                        <h1 className="auth-h1">
                            {haveAcc ? "Login" : "Registration"}
                        </h1>
                        <div className="input-box">
                            <Input
                                type="text"
                                placeholder="username"
                                name="reg-username"
                                value={username}
                                setValue={setUsername}
                                error={usernameError}
                                setError={setUsernameError}
                            />
                        </div>

                        <div className="input-box">
                            <Input
                                type="password"
                                placeholder="password"
                                name="reg-password"
                                value={password}
                                setValue={setPassword}
                                error={passwordError}
                                setError={setPasswordError}
                                eye={eye}
                                eyeSlash={eyeSlash}

                            />
                        </div>

                        <button
                            type={
                                passwordError || usernameError  ? "button" : "submit"}
                            className="auth-btn"
                        >
                            <span>{haveAcc?"Sign in":"Sign up"}</span>
                            <span></span>
                        </button>

                        <p className="auth-p" onClick={() => setHaveAcc(!haveAcc)}>
                           {haveAcc ? "don't have an account?" : "already have an account?"}
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}
