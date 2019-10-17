import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';


const useStyles = makeStyles({
  root:{
    padding:5,
    maxHeight: '8em',
  },
  card: {
    minWidth: 200,
    maxWidth: 800,
    height: '14em',
    margin: '1em auto',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  pos: {
    marginBottom: 24,
  },
});

export default function BigTeamCard({games, month, team}) {
    const classes = useStyles();
    const makeMonth = month =>{
        switch(month){
            case 0:
                return "January"
            case 1:
                return "February"
            case 2:
                return "March"
            case 3:
                return "April"
            case 4:
                return "May"
            case 5: 
                return "June"
            case 6:
                return "July"
            case 7:
                return "August"
            case 8:
                return "September"
            case 9:
                return "October"
            case 10:
                return "November"
            case 11:
                return "December"
            default:
                return "Error"
        }
    }
    if (month === 4 | month === 5 | month === 6 | month === 7 | month === 8){
        return null
    }
    const countGamesbyStatus = (status)=>{
        const count = games.filter(game=>{
            if (game.homeTeam.name === team && game.homeTeamStatus === status){
                return 1
            } 
            if (game.awayTeam.name === team && game.awayTeamStatus === status){
                return 1
            }
            else{
                return null
            }
        })
        return count.length
    }
    return (
        <Card className={classes.card}>
        <CssBaseline />
        <CardContent className={classes.root}>
            <h3>{makeMonth(month)}</h3>
            <p>
                Total Games: {games.length}
            </p>
            <p>Well Rested Games: {countGamesbyStatus(3)}</p>
            <p>Rested Games: {countGamesbyStatus(2)}</p>
            <p>Tired Games: {countGamesbyStatus(1)}</p>
        </CardContent>
        </Card>
    );
    }