import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import useStyles from './style'
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './post/Post'

const Posts = () => {
  const classes = useStyles();
  const {isLoading,posts} = useSelector((state)=>state.post)
  // console.log(posts,'its me')

  const newPost= [...posts].reverse()
  
  return (
    isLoading?<CircularProgress/>:(
    <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
      {newPost?.map((post)=>(
        <Grid key={post._id} item xs={10} sm={16}>
          <Post post={post} id={post._id}/>
        </Grid>
      ))}
    </Grid>)
  )
}

export default Posts