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

export default function AutoGrid({teams}) {
  const classes = useStyles();
  let atlantic = teams.filter(team => team.team.division==='Atlantic')
  const pacific = teams.filter(team => team.team.division==='Pacific')
  const metropolitan = teams.filter(team => team.team.division==='Metropolitan')
  const central = teams.filter(team => team.team.division==='Central')
  return (
    <div className={classes.root } >
      <Typography variant="h4" className={classes.title}>
            Divisions
      </Typography>
      <Grid container={true} spacing={2}
        direction="row"
        justify="center"
        alignItems="top"
        width='40%'
      >
        <Grid item xs={12} sm={12} md={6} l={6} xl={6}>
          <DivisionCard teams={atlantic} mytitle={'Atlantic'}/>
        </Grid>
        <Grid item xs={12} sm={12} md={6} l={6} xl={6}>
        <DivisionCard teams={metropolitan} mytitle={"Metropolitan"}/>
        </Grid>
        <Grid item xs={12} sm={12} md={6} l={6} xl={6}>
          <DivisionCard teams={central} mytitle={"Central"}/>
        </Grid>
        <Grid item xs={12} sm={12} md={6} l={6} xl={6}>
          <DivisionCard teams={pacific} mytitle={"Pacific"}/>
        </Grid>
      </Grid>
    </div>
  );
}