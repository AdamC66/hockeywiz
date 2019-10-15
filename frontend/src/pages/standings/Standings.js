import React from 'react';
import StandingsTabs from '../../components/StandingsTabs/StandingsTabs'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Standings() {

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
          row
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
         <StandingsTabs teams={data.allTeamRecords}/>
      </div>
    );
  }
  
  export default Standings;