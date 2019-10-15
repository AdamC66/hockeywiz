import React from 'react';
import DivisionTable from '../../components/DivisionTable/DivisionTable'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
    }
    `
    const { data, loading, error } = useQuery(GET_STANDINGS);
    if (loading) return <div>Loading</div>
    if (error) return <div>Error</div>
    return (
        
      <div className="Teams">
        <DivisionTable teams={data.allTeamRecords}/>
      </div>
    );
  }
  
  export default Home;