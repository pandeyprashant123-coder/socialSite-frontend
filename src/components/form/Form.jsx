import React, { useState } from "react";
import useStyles from "./style";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  updatePost,
  updateIt,
  postIt,
} from "../../features/socialSlice";
import { useEffect } from "react";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setpostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'))
  const post = useSelector((state) =>
    currentId ? state.post.posts.find((p) => p._id === currentId) : null
  );
  useEffect(() => {
    if (post) setpostData(post);
  }, [post]);
  const { postBtn, updateBtn } = useSelector((state) => state.post);
  const handleSubmit = (e) => {
    e.preventDefault();
    const toupdateData={...postData,name:user?.result?.name}
    if (currentId) dispatch(updatePost({ currentId, toupdateData }));
    else dispatch(createPost({...postData,name:user?.result?.name}));
    clear();
    if (postBtn) dispatch(postIt());
    updateBtn && dispatch(updateIt());
  };
  // console.log(postBtn);
  const clear = () => {
    // setCurrentId(null);
    setpostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if(!user?.result?.name){
    return(
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">Please sign in to create your own posts</Typography>
      </Paper>
    )
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId?`editing "${post.title}"`:'creating a post'}</Typography>
        
        <TextField
          name="title"
          varient="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) => setpostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          varient="outlined"
          label="message"
          fullWidth
          multiline
          minRows={4}
          maxRows={6}
          value={postData.message}
          onChange={(e) =>
            setpostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          varient="outlined"
          label="tags (comma seperated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setpostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setpostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
