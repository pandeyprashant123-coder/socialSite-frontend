import React,{useEffect, useState} from "react";
import {Container , AppBar, Typography,Grow , Grid} from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux";

import Posts from "./components/Posts/Posts"
import Form from "./components/form/Form";
import useStyles from './styles'
import { getPosts } from "./features/socialSlice";

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId,setCurrentId] = useState(null);
  const {Postcount,posts} = useSelector(state=>state.post)
  useEffect(()=>{
    dispatch(getPosts());
  },[dispatch])
  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories</Typography>
        <img src="https://raw.githubusercontent.com/adrianhajdin/project_mern_memories/master/client/src/images/memories.png?token=AF56X74XONEUGZ4FD2FUIA27UURPI" alt="memories" height='60' />
      </AppBar>
        <Grow in>
          <Container>
            <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId}/>
              </Grid>
              <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
    </Container>
  );
}

export default App;
