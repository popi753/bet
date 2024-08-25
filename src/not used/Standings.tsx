

import "../styles/standings.css"


type standingsProps = {
    standings: any[]
}

export default function Standings({standings}:standingsProps) {


    return(
        <div className="standings-container">
          
            {standings.map((standing) => {
                return(
                    <div className="standing" key={standing.team.id}>
                        <p className="standing-rank">{standing.rank}.</p>
                        <img className="standing-team-logo" src={standing.team.logo} alt="logo" />
                        <p className="standing-team-name">{standing.team.name}</p>
                        <span className="standing-points">{standing.points}</span>
                    </div>
                )
            })}

        </div>
    )
}