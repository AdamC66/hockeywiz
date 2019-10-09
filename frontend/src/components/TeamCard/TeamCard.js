import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import logoPlaceholder from '../../img/logo-placeholder.jpeg'
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles({
  card: {
    minWidth: 200,
    maxWidth: 800,
    height: '6em',
    margin: '0.5em auto',
  },
  title: {
    fontSize: 24,
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
      height: '4em',
      margin: 0,
      padding: 0,
      textAlign: 'center',
  },
  compress:{
      margin: 0,
      padding: 0,
  }
});

export default function SimpleCard(team) {
  const classes = useStyles();


  return (
    <Card className={classes.card}>
    <CssBaseline />
      <CardContent>
          <div className={classes.teamCardContent}>
        <div className={classes.teamCardLeft}>
            <img className={classes.teamLogo} src={`/teamlogos/${team.team.city.toLowerCase().replace(/\s/g, '')}.png`} alt="" />
        </div>
        <div className={classes.teamCardCenter}>
            <span className={classes.compress}> W: &nbsp;  L: &nbsp;  SOL: &nbsp; </span>
            <span className={classes.compress}> Contracts:  &nbsp;     Cap Space: &nbsp;  </span>
        </div>  
        <div className={classes.teamCardRight}>
            <Typography variant="h6">
                PTS: 23
            </Typography>
        </div>
        </div>
      </CardContent>
    </Card>
  );
}