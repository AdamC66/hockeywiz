import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root:{
    padding:5,
    maxHeight: '3em',
  },
  card: {
    minWidth: 200,
    maxWidth: 800,
    height: '4em',
    margin: '0.5em auto',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  pos: {
    marginBottom: 24,
  },
  teamCardContent:{
    display: 'grid',
    gridTemplateColumns:'1fr 4fr 1fr',
    padding: 0,
  },
  teamCardLeft:{
    gridColumnStart: 1,
  },
  teamCardCenter:{
    gridColumnStart: 2,
    display: 'grid',
    gridTemplateRows: '2em 2em',

  },
  teamCardRight:{
    gridColumnStart: 3
  },
  teamLogo:{
      width: 'auto',
      height: '3em',
      margin: 0,
      padding: 0,
      textAlign: 'center',
  },
  compress:{
      margin: 0,
      padding: 0,
  },
  link:{
    textDecoration: 'none',
    color: 'black'
  }
});

export default function SimpleCard({team}) {
  const classes = useStyles();


  return (
    <Link to={`/Teams/${team.team.name}`} className={classes.link}>
    <Card className={classes.card}>
    <CssBaseline />
      <CardContent className={classes.root}>
          <div className={classes.teamCardContent}>
        <div className={classes.teamCardLeft}>
            <img className={classes.teamLogo} src={`/teamlogos/${team.team.city.toLowerCase().replace(/\s/g, '')}.png`} alt="" />
        </div>
        <div className={classes.teamCardCenter}>
            <span className={classes.compress}> W: {team.wins} | L: {team.losses} | OTL: {team.ot} </span>
            <span className={classes.compress}> GP: {team.gamesPlayed} | GF: {team.goalsScored} | GA: {team.goalsAgainst} | streak: {team.streakLength} {team.streakType} </span>
        </div>  
        <div className={classes.teamCardRight}>
            <Typography variant="h6">
                PTS: {team.points}
            </Typography>
        </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}