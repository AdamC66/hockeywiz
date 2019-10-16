import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Toolbar from 'react-big-calendar/lib/Toolbar'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: "80%",
    margin: '0 auto',
    background: 'white',
  },
  cardHeader:{
    background: 'blue',
    color: 'white',
    textAlign: 'center',
  },
  calendarContainer:{
      height: '40em',
  },
  blankSpace:{
      width: '100%',
      height: '3em',
      display: 'block'
  }


}));

export default function GameCalendar({games}) {
    const classes = useStyles();
    const localizer = momentLocalizer(moment)
    let myEventsList = []
    games.forEach(game => {
        myEventsList.push({
            title: `${game.homeTeam.name} vs ${game.awayTeam.name}`,
            start: new Date(game.date),
            end: new Date(game.date),
            allDay:true
        })
    });
    console.log(myEventsList)
    return (
        <Card className={classes.card}>
        <CardHeader
            className={classes.cardHeader}
            title="Schedule"
        />
        <CardContent className={classes.calendarContainer}>
            <Calendar
            components = {{toolbar : CustomToolbar}}
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            views={['month']}
            title={false}
            />
        </CardContent>
        <div className={classes.blankSpace}></div>
        </Card>


    );
}

class CustomToolbar extends Toolbar {
    render() {
      return (
        <React.Fragment>
        <div className="calendar"><h3 style={{margin:'0', padding:'0',textAlign: 'center'}}>{this.props.label}</h3></div>
        <div className='rbc-toolbar'>
          <span className="rbc-btn-group">
            <button type="button" onClick={() => this.navigate('TODAY')} >Today</button>
            <button type="button" onClick={() => this.navigate('PREV')}>Back</button>
            <button type="button" onClick={() => this.navigate('NEXT')}>Next</button>
          </span>
        </div>
        </React.Fragment>
      );
    }
    navigate = action => {
        console.log(action);
        
        this.props.onNavigate(action)
      }
    }
