import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import BigTeamCard from '../../components/BigTeamCard/BigTeamCard'
import Calendar from '../../components/Calendar/Calendar'
import { Link } from 'react-router-dom'
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
          homeGame{
            homeTeam{
              city
              name
            }
            awayTeam{
              city
              name
            }
            date
            venue
            gamePk
            status
            finalScoreHome
            finalScoreAway
          }
          awayGame{
            homeTeam{
              city
              name
            }
            awayTeam{
              city
              name
            }
            date
            venue
            gamePk
            status
            finalScoreHome
            finalScoreAway
          }
        }
    }
        `     
    const { data:teamData, loading:teamLoading, error:teamError } = useQuery(GET_TEAM, {variables: {name: props.match.params.name}});
    if (teamLoading) return <div>Loading</div>
    if (teamError) return <div>Error</div>

    return (
        <div>
            <BigTeamCard team={teamData.team}></BigTeamCard>
            <Link to={`/Teams/Schedule/${props.match.params.name}`}> Schedule </Link>
            <Calendar games={[...teamData.team.awayGame, ...teamData.team.homeGame]}/>
        </div>
    )
}

export default Teams
