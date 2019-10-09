import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DivisionCard from '../DivisionCard/DivisionCard';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0,
    margin: '2em auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '0em 1em',
    },
      
    [theme.breakpoints.up('md')]: {
      width: '90%',
      padding: '0em 2em',
    },

    [theme.breakpoints.up('lg')]: {
      width: '80%',
      padding: '0em 4em',
    }
  },
  rootsm:{
    flexGrow: 0,
    margin: '2em auto',
    padding: '0em 0em',
    width: '100%',
  }
}));

export default function AutoGrid(teams) {
  const classes = useStyles();
  console.log("DIVISION TABLE", teams.teams)
  let atlantic = teams.teams.filter(team => team.division==='Atlantic')
  const pacific = teams.teams.filter(team => team.division==='Pacific')
  const metropolitan = teams.teams.filter(team => team.division==='Metropolitan')
  const central = teams.teams.filter(team => team.division==='Central')
  return (
    <div className={classes.root } >
      <Typography variant="h4" className={classes.title}>
            Divisions
      </Typography>
      <Grid container={true} spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
        width='40%'
      >
        <Grid item xs={12} sm={12} md={6} l={6} xl={6}>
          <DivisionCard teams={atlantic}/>
        </Grid>
        <Grid item xs={12} sm={12} md={6} l={6} xl={6}>
        <DivisionCard teams={metropolitan}/>
        </Grid>
        <Grid item xs={12} sm={12} md={6} l={6} xl={6}>
          <DivisionCard teams={central}/>
        </Grid>
        <Grid item xs={12} sm={12} md={6} l={6} xl={6}>
          <DivisionCard teams={pacific}/>
        </Grid>
      </Grid>
    </div>
  );
}