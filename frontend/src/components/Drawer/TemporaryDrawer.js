import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import GroupIcon from '@material-ui/icons/Group';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Home', 'Teams', 'Standings', 'Tools'].map((text, index) => (
          <Link to={`/${text}`} key={index}>
          <ListItem button key={text}>
            <ListItemIcon>{<GroupIcon />}</ListItemIcon>
            <ListItemText primary={text} /> 
          </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['Rules', 'About', 'Contact'].map((text, index) => (
          <Link to={`/${text}`} key={index}>
          <ListItem button key={text}>
            <ListItemIcon>{<GroupIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );


  return (
    <div>
      <MenuIcon onClick={toggleDrawer('left', true)} />
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}