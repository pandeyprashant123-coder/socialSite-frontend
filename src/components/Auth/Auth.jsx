import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authReducer,signin,signup } from "../../features/authSlice";

import useStyles from "./style";
import Input from "./Input";
import Icon from "./icon";

const inititalState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:'',}
const Auth = () => {
  const classes = useStyles();
  const [showPassword, setshowPassword] = useState(false);
  const [isSignUp, setisSignup] = useState(false);
  const [formData, setFormData] = useState(inititalState)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelSubmit = (e) => {
    e.preventDefault()
    // console.log(formData,'auth')
    if(isSignUp){
      dispatch(signup({formData,navigate}))
    }else{
      dispatch(signin({formData,navigate}))
    }
  };
  const handelChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };
  const handelShowPassword = () => {
    setshowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setisSignup((prevSignup) => !prevSignup);
    setshowPassword(false);
  };
  React.useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "601919332903-peh0l5dsi84emi4q2q33ukfgn6034ntv.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(authReducer({ result, token }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (e) => {
    // console.log(e);
    console.log("Google sigin was Unsuccessful. tryagain later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handelSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handelChange={handelChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handelChange={handelChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handelChange={handelChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handelChange={handelChange}
              type={showPassword ? "text" : "password"}
              handelShowPassword={handelShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handelChange={handelChange}
                type={showPassword ? "text" : "password"}
              handelShowPassword={handelShowPassword}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="601919332903-peh0l5dsi84emi4q2q33ukfgn6034ntv.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account ? Sign In"
                  : "Don't have an account? sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
