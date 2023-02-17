import React from "react";
import { AppBar, Typography, Button, Toolbar, Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link, useNavigate,useLocation } from "react-router-dom";
import decode from 'jwt-decode'

import useStyles from "./style";
import { postIt} from "../../features/socialSlice";
import { logOut } from "../../features/authSlice";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const logout = () => {
    dispatch(logOut());
    navigate('/');
    setUser(null);
  };
  React.useEffect(()=>{
    const token = user?.token
    if(token){
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()) logOut()
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])

  return (
    <AppBar className={`navbar ${classes.appBar}`} position="static" color="inherit">
      <Typography
        component={Link}
        to="/"
        className={`head ${classes.heading}`}
        variant="h2"
        align="center"
      >
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
      <Toolbar className={`toolbarO ${classes.toolbar}`}>
        {user ? (
          <div className={`toolbar ${classes.profile}`}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            SignIn
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
