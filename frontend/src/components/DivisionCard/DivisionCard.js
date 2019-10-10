import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TeamCard from '../TeamCard/TeamCard'
import { CardHeader } from '@material-ui/core';

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
    backgroundColor: '#3f51b5',
    color: 'white',
  },
  pos: {
    marginBottom: 12,
  },

});


export default function SimpleCard({teams, mytitle}) {
  const classes = useStyles();
  const appElements = teams.map((team, i)=><TeamCard key={i} id={i} team={team}/>)
    console.log("__DIVISION CARD", mytitle)
  return (
    <Card className={classes.card}>
    <CardHeader title={mytitle} className={classes.title}/>
      <CardContent>
            { appElements }
      </CardContent>
    </Card>
  );
}