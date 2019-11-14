import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import BigTeamCard from '../../components/BigTeamCard/BigTeamCard'
import TeamTabs from '../../components/TeamTabs/TeamTabs'
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
          players{
            fullName
            positionName
            jerseyNumber
            positionCode
            positionAbbv
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
            homeTeamStatus
            awayTeamStatus
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
            homeTeamStatus
            awayTeamStatus
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
            <TeamTabs games={[...teamData.team.awayGame, ...teamData.team.homeGame]} team={props.match.params.name} players={teamData.team.players}/>
        </div>
    )
}

export default Teams
