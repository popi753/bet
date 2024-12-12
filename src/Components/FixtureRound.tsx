type fixture = {
    fixture: {
        id: number;
        referee: string | null;
        timezone: string;
        date: string;
        timestamp: number;
        periods: {
            first: number | null;
            second: number | null;
        };
        venue: {
            id: number | null;
            name: string | null;
            city: string | null;
        };
        status: {
            long: string;
            short: string;
            elapsed: number | null;
        };
    };
    league: {
        id: number;
        name: string;
        country: string;
        logo: string;
        flag: string | null;
        season: number;
        round: string;
    };
    teams: {
        home: {
            id: number;
            name: string;
            logo: string;
            winner: boolean | null;
        };
        away: {
            id: number;
            name: string;
            logo: string;
            winner: boolean | null;
        };
    };
    goals: {
        home: number | null;
        away: number | null;
    };
    score: {
        halftime: {
            home: number | null;
            away: number | null;
        };
        fulltime: {
            home: number | null;
            away: number | null;
        };
        extratime: {
            home: number | null;
            away: number | null;
        };
        penalty: {
            home: number | null;
            away: number | null;
        };
    };
};

interface round {
    [name: string]: fixture[];
}

export default function FixtureRound({ roundName }: { roundName: round }) {


 

    
    return (
        <>
            <tr>
                <td colSpan={9} className="roundName">
                    <span>{Object.keys(roundName)[0]}</span>
                </td>
            </tr>

            {roundName[Object.keys(roundName)[0]].map((element) => {
                return (
                    <tr key={element.fixture.id} className="standings-row">
                        <td className="fixtureDate">
                            <span className="fixtureDateSpan">
                                
                                {`${new Date(1e3 * element.fixture.timestamp).getDate().toString().padStart(2,"0")}.${(new Date(1e3 * element.fixture.timestamp).getMonth()+1).toString().padStart(2,"0")}`}
                            </span> <br />
                            {element.fixture.status.short == "TBD" ? 
                            <span className="fixtureDate" title="Time To Be Defined">
                                TBD
                            </span>
                            :
                        <span className="fixtureTime">
            
                                            { new Date(1e3 * element.fixture.timestamp).getHours().toString().padStart(2,"0")}:{new Date(1e3 * element.fixture.timestamp).getMinutes().toString().padStart(2,"0")}
            
                        </span>
                        }
                        </td>

                        <td className="homeName">
                            <span >{element.teams.home.name}</span>
                        </td>

                        <td>
                            <img
                                className="standings-logo"
                                src={element.teams.home.logo}
                                loading="lazy"
                                alt="away team logo"
                            />
                        </td>

                        <td className="score">
                            {Number.isInteger(element.goals.home) ? element.goals.home : "-  "  } : {Number.isInteger(element.goals.away) ? element.goals.away : "  -"  }
                        </td>

                        <td>
                            <img
                                className="standings-logo"
                                src={element.teams.away.logo}
                                loading="lazy"
                                alt="home team logo"
                            />
                        </td>

                        <td className="awayName">
                            <span >{element.teams.away.name}</span>
                        </td>

                        <td className="info">
                            <span className="infoSpan" title="show fixture">
                                ?
                            </span>
                        </td>
                    </tr>
                );
            })}
        </>
    );
}
