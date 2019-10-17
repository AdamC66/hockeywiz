import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import BigTeamCard from '../../components/BigTeamCard/BigTeamCard'
import ScheduleMonth from '../../components/ScheduleMonth/ScheduleMonth'
import { object } from 'prop-types';
function Schedule(props) {
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
    console.log([...teamData.team.awayGame, ...teamData.team.homeGame])
    const fixedGames = [...teamData.team.awayGame, ...teamData.team.homeGame]
    fixedGames.forEach(game =>{
        game.date = new Date(game.date)
    })
    fixedGames.sort((a,b)=>{
        return a.date<b.date ? -1 : a.date>b.date ? 1 : 0;
    })
    let monthCards = []
    for (let i = 0; i < 12; i++) {
        let games_by_month = fixedGames.filter((item) =>{
            return (item.date.getMonth()===i)
        })
        monthCards.push(<ScheduleMonth games={games_by_month} month={i} team={props.match.params.name}/>)
        
    };

    console.log(fixedGames)
    
    return (
        <div>
            <BigTeamCard team={teamData.team}></BigTeamCard>
            {monthCards}
        </div>
    )
}

export default Schedule
