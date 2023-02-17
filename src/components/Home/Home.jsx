import React,{useEffect, useState} from "react";
import {Container,Grow , Grid} from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux";

import Posts from "../../components/Posts/Posts"
import Form from "../form/Form";
import useStyles from './style'
import { getPosts } from "../../features/socialSlice";

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {postBtn} = useSelector(state=>state.post)
  useEffect(()=>{
    dispatch(getPosts());
  },[dispatch])
  return (
    <>
        {postBtn && (<Form/>)}
        <Grow in>
          <Container>
            <Grid container className={classes.mainContainer} justifyContent="center" alignItems="center" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
    </>
  );
}

export default Home;
