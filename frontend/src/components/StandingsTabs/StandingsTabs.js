import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StandingsTable from '../StandingsTable/StandingsTable'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '90%',
    margin: '0 auto',
  },
}));

export default function StandingsTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const eastTeams = props.teams.filter(team => team.team.division==='ATLANTIC' || team.team.division==='METROPOLITAN')
  const westTeams = props.teams.filter(team => team.team.division==='PACIFIC' || team.team.division==='CENTRAL')
  const atlantic = props.teams.filter(team => team.team.division==='ATLANTIC')
  const pacific = props.teams.filter(team => team.team.division==='PACIFIC')
  const metropolitan = props.teams.filter(team => team.team.division==='METROPOLITAN')
  const central = props.teams.filter(team => team.team.division==='CENTRAL')
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="League" {...a11yProps(0)} />
          <Tab label="Division" {...a11yProps(1)} />
          <Tab label="Conference" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} key={0} index={0} dir={theme.direction}>
          <StandingsTable key={1} teams={props.teams} title={"League"}/>
        </TabPanel>
        <TabPanel value={value} key={2} index={1} dir={theme.direction}>
          <StandingsTable key={3} teams={atlantic} title={"Atlantic"}/>
          <StandingsTable key={4} teams={metropolitan} title={"Metropolitan"}/>
          <StandingsTable key={5} teams={central} title={"Central"}/>
          <StandingsTable key={6} teams={pacific} title={"Pacific"}/>
        </TabPanel>
        <TabPanel value={value} key={7} index={2} dir={theme.direction}>
          <StandingsTable key={8} teams={eastTeams} title={"East"}/>
          <StandingsTable key={9} teams={westTeams} title={"West"}/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}