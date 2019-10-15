import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import BigTeamCard from '../../components/BigTeamCard/BigTeamCard'
function Teams(props) {
    const GET_TEAM = gql`
    query team($name: String){
        team(name: $name){
          name
          city
          teamRecord{
            wins
            losses
            ot
            gamesPlayed
            goalsScored
            goalsAgainst
            streakType
            streakLength
            points
          }
        }
      }
        `
        const { data, loading, error } = useQuery(GET_TEAM, {variables: {name: props.match.params.name}});
        if (loading) return <div>Loading</div>
        if (error) return <div>Error</div>
        console.log(data)
    return (
        <div>
            <BigTeamCard team={data.team}></BigTeamCard>
        </div>
    )
}

export default Teams
