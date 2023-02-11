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
    creator: "",
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.post.posts.find((p) => p._id === currentId) : null
  );
  useEffect(() => {
    if (post) setpostData(post);
  }, [post]);
  const { postBtn, updateBtn } = useSelector((state) => state.post);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) dispatch(updatePost({ currentId, postData }));
    else dispatch(createPost(postData));
    clear();
    if (postBtn) dispatch(postIt());
    updateBtn && dispatch(updateIt());
  };
  console.log(postBtn);
  const clear = () => {
    setCurrentId(null);
    setpostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6"></Typography>
        <TextField
          name="creator"
          varient="outlined"
          label="creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setpostData({ ...postData, creator: e.target.value })
          }
        />
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
          value={postData.message}
          onChange={(e) =>
            setpostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          varient="outlined"
          label="tags"
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
