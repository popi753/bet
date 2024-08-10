import { useState } from "react";
import "../styles/input.css"




type InputProps = {
    type            : string;
    placeholder     : string;
    name            : string;
    value           : string;
    setValue        : (value: string) => void;
    error           : string;
    setError        : (value: string) => void;
    eye?            : string;
    eyeSlash?       : string;

};

export default function Input({ type, placeholder, name, value, setValue, error, setError,eye,eyeSlash }: InputProps) {

    const [showError, setShowError] = useState<boolean>(false)
    const [showPass, setShowPass] = useState<boolean>(type == "password" ? false : true)


    

    return (
        <>
            <input
                value={value}
                type={!showPass ? "password" : "text"}
                placeholder={`enter ${placeholder}`}
                name={name}
                autoComplete="off"
                autoFocus={false}
                onChange={(e) => {
                    setValue(e.target.value)
                    setError(e.target.value.length < 8 ? "more than 8 characters" : placeholder == "username" && e.target.value.length > 20 ? "less than 20 characters" : "")

                    }
                }
                
                onBlur={() =>
                        setShowError(!showError)
                        // setError(value.length < 8 ? "more than 8" : placeholder == "username" && value.length > 20 ? "less than 20" : "")
                }
                required
            />
            <label htmlFor={name}>
                {showError && error}

            </label>
                {eye?<img 
                    className="eye"
                    src={!showPass ? eyeSlash : eye} 
                    alt="" 
                    onClick={()=>{
                        setShowPass(!showPass)
                    }}/>
                    :  null}
        </>

    )


}