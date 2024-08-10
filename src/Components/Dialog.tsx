import { useState } from "react";
import "../styles/dialog.css";



import Auth from "./Auth";

type dialogProps = {
    dialogRef: React.RefObject<HTMLDialogElement>;
};

export default function Dialog({ dialogRef }: dialogProps) {
    const [haveAcc, sethaveAcc] = useState<boolean>(false);

    function close() {
        dialogRef.current?.close();
    }

    return (

        
        <>
            <dialog
                ref={dialogRef}
                onClick={() => {
                    close();
                }}
            >
                <div
                    className="dialog-container"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >

                    <Auth
                    haveAcc     = {haveAcc}
                    setHaveAcc  = {sethaveAcc}
                    close       = {close}
                    />

                    
                    
                </div>
            </dialog>
        </>
    );
}
