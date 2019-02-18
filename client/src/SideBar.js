// import React from 'react'
import { Link } from "react-router-dom"


// function SideBar(){
//   return(
//     <div>
//       <Link to="/"><button>My Items</button></Link>
//       <Link to="/borrowed"><button>Borrowing</button></Link>
//       <Link to="/library"><button>Library</button></Link>      
//     </div>
//   )
// }

// export default SideBar


import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
// import { Link } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '250px',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
  },
});

function ListDividers(props) {
  const { classes } = props;
  return (
    <List component="nav" className={classes.root}>
      <ListItem button component={Link} to='/' selected = {window.location.pathname === '/'}>
        <ListItemText primary="My Items" />
      </ListItem>
      <Divider />
      <ListItem button component={Link} to='/borrowed' selected = {window.location.pathname === '/borrowed'}>
        <ListItemText primary="Borrowing" />
      </ListItem>
      <Divider />      
      <ListItem button component={Link} to='library' selected = {window.location.pathname === 'library'}>
        <ListItemText primary="Library" />
      </ListItem>
      <Divider />

    </List>
  );
}

// ListDividers.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(ListDividers);