import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';


const useStyles = makeStyles({
  root:{
    padding:5,
    maxHeight: '6em',
  },
  card: {
    minWidth: 200,
    maxWidth: 800,
    height: '10em',
    margin: '1em auto',
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
    textAlign: 'center',

  },
  teamCardRight:{
    gridColumnStart: 3
  },
  teamLogo:{
      width: 'auto',
      height: '8em',
      margin: '0.5em',
      padding: 0,
      textAlign: 'center',
  },
  compress:{
      margin: '2em 0.25em',
      padding: 0,
  }
});

export default function BigTeamCard({team}) {
  const classes = useStyles();


  return (
    <Card className={classes.card}>
    <CssBaseline />
      <CardContent className={classes.root}>
          <div className={classes.teamCardContent}>
        <div className={classes.teamCardLeft}>
            <img className={classes.teamLogo} src={`/teamlogos/${team.city.toLowerCase().replace(/\s/g, '')}.png`} alt="" />
        </div>
        <div className={classes.teamCardCenter}>
            <Typography variant="h4">
                {team.city=== "New YorkR" || team.city=== "New YorkI"? "New York" : team.city} {team.name}
            </Typography>
            <div className={classes.compress}> W: {team.teamRecord[0].wins} | L: {team.teamRecord[0].losses} | OTL: {team.teamRecord[0].ot} </div>
            <div className={classes.compress}> GP: {team.teamRecord[0].gamesPlayed} | GF: {team.teamRecord[0].goalsScored} | GA: {team.teamRecord[0].goalsAgainst} | streak: {team.teamRecord[0].streakLength} {team.teamRecord[0].streakType} </div>
        </div>  
        <div className={classes.teamCardRight}>
            <Typography variant="h6">
                PTS: {team.teamRecord[0].points}
            </Typography>
        </div>
        </div>
      </CardContent>
    </Card>
  );
}