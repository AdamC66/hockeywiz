import React from 'react';
import DivisionTable from '../../components/DivisionTable/DivisionTable'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import UpcomingGames from '../../components/UpcomingGames/UpcomingGames'


function Home() {
    const GET_STANDINGS = gql`
    query {
      allTeamRecords {
        team {
          name
          city
          nhlApiId
          division
        }
        wins
        losses
        ot
        gamesPlayed
        goalsScored
        goalsAgainst
        streakLength
        streakType
        points
      }
      todaysGames {
        homeTeam {
          city
          name
        }
        awayTeam {
          city
          name
        }
        date
      } 
    }
    `
    const { data, loading, error } = useQuery(GET_STANDINGS);
    if (loading) return <div>Loading</div>
    if (error) return <div>Error</div>
    return (
        
      <div className="Teams">
        <UpcomingGames games={data.todaysGames}/>
        <DivisionTable teams={data.allTeamRecords}/>
      </div>
    );
  }
  
  export default Home;