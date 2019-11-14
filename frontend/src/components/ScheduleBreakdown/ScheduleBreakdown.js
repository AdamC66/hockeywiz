import React from 'react'


import ScheduleMonth from '../ScheduleMonth/ScheduleMonth'

function Schedule(props) {

    props.games.forEach(game =>{
        game.date = new Date(game.date)
    })
    props.games.sort((a,b)=>{
        return a.date<b.date ? -1 : a.date>b.date ? 1 : 0;
    })
    let monthCards = []
    const monthOrder = [9,10,11,0,1,2,3]
    monthOrder.forEach(i =>{
        console.log(i)
        let games_by_month = props.games.filter((item) =>{
            return (item.date.getMonth()===i)
        })
        monthCards.push(<ScheduleMonth games={games_by_month} month={i} key={i} team={props.team}/>)
    })
   
    return (
        <div>
            {monthCards}
        </div>
    )
}

export default Schedule
