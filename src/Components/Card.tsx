
import "../styles/card.css";

type cardProps = {
    name? : string,
    logo? : string,
}

export default function Card({logo,name}:cardProps) {


        

        return(
            <>
            <div className="card">
                <div className="card-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="card-name">
                    <h3>{name}</h3>
                </div>
            </div>
            </>
        )    
}