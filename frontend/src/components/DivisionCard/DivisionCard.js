import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TeamCard from '../TeamCard/TeamCard'

const useStyles = makeStyles({
  card: {
    minWidth: 300,
    margin: '0 auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function SimpleCard(teams) {
  const classes = useStyles();
  const appElements = teams.teams.map((team, i)=><TeamCard key={i} id={i} team={team}/>)
    console.log("__DIVISION CARD", teams)
  return (
    <Card className={classes.card}>
      <CardContent>
            { appElements }
      </CardContent>
    </Card>
  );
}