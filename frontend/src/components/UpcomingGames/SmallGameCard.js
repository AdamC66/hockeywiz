import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles({
  card: {
    width: 275,
    height: '7em',
    alignSelf: 'auto',
    flex: '0 0 auto',
  },
  cardContent:{
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    gridGap: '1em',
  },
  teamLogo:{
    width: 'auto',
    height: '1em',
    margin: 0,
    marginRight: '0.5em',
    padding: 0,
    textAlign: 'center',
    display: 'inline',
  
},
  top:{
    gridRowStart: '1',
  },
bottom:{
  gridRowStart: '2',
}

});

export default function SimpleCard({game}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <div className={classes.top}>
  
            <img className={classes.teamLogo} src={`/teamlogos/${game.homeTeam.city.toLowerCase().replace(/\s/g, '')}.png`} alt="" />
          {game.homeTeam.name}
        </div>
        <div className={classes.bottom}>
            <img className={classes.teamLogo} src={`/teamlogos/${game.awayTeam.city.toLowerCase().replace(/\s/g, '')}.png`} alt="" />
          {game.awayTeam.name}
        </div>
      </CardContent>
    </Card>
  );
}