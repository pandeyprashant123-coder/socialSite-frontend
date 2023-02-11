import React from "react";
import { AppBar, Typography, Button, Toolbar, Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom'

import useStyles from "./style";
import { postIt } from "../../features/socialSlice";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = null;
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">
        Fellow-Site
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={() => dispatch(postIt())}
      >
        Post
      </Button>
      <Toolbar className={classes.toolbar}>
        {user?(
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color='secondary'>Logout</Button>
            </div>
        ):(
            <Button component={Link} to='/auth' variant="contained" color="primary">SignIn</Button>
        )
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
