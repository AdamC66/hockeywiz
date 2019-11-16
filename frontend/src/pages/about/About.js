import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    width: '80%',
    margin: '1em auto',
  },
}));

export default function PaperSheet() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        About This Project
      </Typography>
      <br/> <br />
      <Typography component="p">
        This is a project I've had in my head since General Fanager got picked up by the Vegas Golden Knights. The original idea was just to create a clone of generalfanager.com. 
        Now, the project has evolved to "what if I can create a better version of NHL.com?" and that's what I'm trying to do. NHL.com without the frills. Data, easily accessible and readable.
        <br/><br/>
        I've been chipping away at this site for about a month now, currently I can only support the current years stats. but do have the neccessary code in place to support historic stats.
        I plan on adding tools, and player contract data eventually. In the meantime, the site currently has team data, standings, rosters, player bios and this seasons stats.
        <br/><br/>
        there are also some features on the board to develop including:
        <ul>
            <li>Player comparison tool</li>
            <li>Contract evaluation tool</li>
            <li>Contract prediction tool</li>
            <li>fancy stats support</li>
        </ul>
        It's been somewhat difficult to work with, but all data so far on this site has come from the NHL public API. Massive thank you to Tommy Andrews, who has put together some documentation for 
        and otherwise undocumented API you can check it out <a href= "https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#teams">here</a> if you're interested. 
      </Typography>
    </Paper>
  );
}