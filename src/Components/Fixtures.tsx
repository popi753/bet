import "../styles/fixtures.css";

import { onFetchFixtures, round } from "../fetch/leagues";


import { useQuery, useQueryClient } from "@tanstack/react-query"

import FixtureRound from "./FixtureRound";





export default function Fixtures({ leagueId, endpoint }: { leagueId: number, endpoint: string, }) {



  const queryClient = useQueryClient();

  const { data, isLoading, isError} = useQuery<round[]>({
    queryKey: [endpoint + leagueId],
    queryFn: () =>
      onFetchFixtures({ league: leagueId, endpoint: endpoint, queryClient: queryClient, }),
    staleTime: 1000 * 60 * 5,
  })









  return (
    <>
      <div className="stats-container">



        {isError ? <div className="error">no information try later</div> :
          isLoading ?
            <div className="wg_loader"></div> :
            data ?
              <div id="wg-api-football-games">

                <table className="stats-table" id="wg-football-games">
                  <thead>
                  </thead>

                  <tbody>
                    {data.map((roundName) => {
                      return (
                        <FixtureRound roundName={roundName} key={Object.keys(roundName)[0]}>

                        </FixtureRound>
                      )
                    })}



                  </tbody>

                </table>


              </div>
              : <div>something went wrong</div>}








      </div>





    </>
  )

}





