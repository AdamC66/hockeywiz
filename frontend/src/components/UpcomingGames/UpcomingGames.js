import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SmallGameCard from './SmallGameCard'
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles(theme => ({
  root: {
    overflowX: 'auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent:'flex-start',
    alignContent: 'flex-start',
    width: '90%',
    height: '9em',
    margin: '0.5em auto',
  },
  title:{
      textAlign: 'center',
      marginTop: '0.5em',
  }
}));

export default function PaperSheet({games}) {
  const classes = useStyles();
  console.log(games)

  const cards = games.map((game, i) =><SmallGameCard key={i} game={game}/>)
//   const appElements = teams.map((team, i)=><TeamCard key={i} id={i} team={team}/>)

  return (
    <React.Fragment>      
    <Typography variant="h4" className={classes.title}>
            Today's Games
      </Typography>
      <Paper className={classes.root}>
        {cards}
    </Paper>
    </React.Fragment>
  );
}