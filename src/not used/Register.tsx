import { useState, useContext } from "react";
import Input from "../Components/Input";
import cirxleX from "../assets/circle-xmark.svg";

import { onRegister, onLogin }  from "../Components/fetch";

import { UserContext } from "../App";


type registerProps = {
    setHaveAcc: React.Dispatch<React.SetStateAction<boolean>>;
    close: () => void;
};

// type contextType = null | [
//     user: string,
//     setUser: React.Dispatch<React.SetStateAction<string>>
//   ]

export default function Register({ setHaveAcc, close }: registerProps) {

    const [user,setUser] = useContext<any>(UserContext)


    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [usernameError, setUsernameError] = useState<string>(" ");
    const [passwordError, setPasswordError] = useState<string>(" ");

    // async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault();

    //     if (username.length < 8 || username.length > 20 || password.length < 8) {
    //         return;
    //     }

    //     try {
    //         const response = await fetch(import.meta.env.VITE_API + "register", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ username, password }),
    //         });
    //         const result = await response.json();


            
    //          if (result.error?.code == "P2002") {
    //             setUsernameError("username is already taken")
    //             return
    //          }
    //         // result.error?.code == "P2002" && setUsernameError("username is already taken")

    //         close()
    //         setUser(result.username)
    //         setUsername("")
    //         setPassword("")
    //         window.localStorage.setItem("token", result.token);
            
            

    //     } catch (error) {
    //         window.alert(error + "/try later");
    //         console.error("this is error:   " + error);
    //     }

    // }

    // onRegister({username,setUsername,password,setPassword,setUsernameError,setUser,e})

    return (
        <>
            <div className="register">
                <form action="POST" tabIndex={0} onSubmit={(e) => 
                    // onSubmit(e)
                    onRegister({username, setUsername, password, setPassword, setUsernameError, setUser,close, e, })
                    }>
                    <div className="auth-form">
                        <img
                            src={cirxleX}
                            className="cirxleX"
                            onClick={() => {
                                close();
                            }}
                        />

                        <h1 className="auth-h1">registration</h1>
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
                            />
                        </div>

                        <button
                            type={
                                passwordError || usernameError  ? "button" : "submit"}
                            className="auth-btn"
                        >
                            <span>register</span>
                            <span></span>
                        </button>

                        <p className="auth-p" onClick={() => setHaveAcc(true)}>
                            already have an account?
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}
