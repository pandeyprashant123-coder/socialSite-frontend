import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import useStyles from './style'
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './post/Post'

const Posts = ({setCurrentId}) => {
  const classes = useStyles();
  const {isLoading,posts} = useSelector((state)=>state.post)
  console.log(posts,'its me')
  return (
    isLoading?<CircularProgress/>:(
    <Grid className={classes.container} container alignItems='stretch' spacing={3}>
      {posts?.map((post)=>(
        <Grid key={post._id} item xs={12} sm={16}>
          <Post post={post} setCurrentId={setCurrentId}/>
        </Grid>
      ))}
    </Grid>)
  )
}

export default Posts