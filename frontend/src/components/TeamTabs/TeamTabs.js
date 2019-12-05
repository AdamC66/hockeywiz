import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Calendar from '../Calendar/Calendar'
import ScheduleBreakdown from '../ScheduleBreakdown/ScheduleBreakdown'
import RosterTable from '../RosterTable/RosterTable'
import SkaterTable from '../SkaterTable/SkaterTable'
import GoalieTable from '../GoalieTable/GoalieTable'
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
    width: '85%',
    margin: '0 auto',
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };
  
  const forwards = props.players.filter(player=> player.positionCode === 'C' || player.positionCode === 'L' || player.positionCode ==='R')
  const defence = props.players.filter(player=> player.positionCode === 'D')
  const goalies = props.players.filter(player=> player.positionCode === 'G')
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
          centered
        >
          <Tab label="Schedule" {...a11yProps(0)} />
          <Tab label="Schedule Breakdown" {...a11yProps(1)} />
          <Tab label="Roster" {...a11yProps(2)} />
          <Tab label="Stats" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Calendar games={props.games}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ScheduleBreakdown games={props.games} team={props.team}/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <RosterTable key={1} players={forwards} title={"Forwards"}/>
          <RosterTable key={2} players={defence} title={"Defence"}/>
          <RosterTable key={3} players={goalies} title={"Goalies"}/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <SkaterTable key={4} players={forwards} title={"Forwards"}/>
          <SkaterTable key={5} players={defence} title={"Defence"}/>
          <GoalieTable key={6} players={goalies} title={"Goalies"}/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}