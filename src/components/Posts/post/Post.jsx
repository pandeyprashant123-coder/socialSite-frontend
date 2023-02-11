import React ,{useState}from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import useStyles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { likePost, deletePost ,updateIt} from "../../../features/socialSlice";
import Form from "../../form/Form";
const Post = ({ post}) => {
  const dispatch = useDispatch();
  const [currentId,setCurrentId] = useState(null);
  // console.log(post)
  const {updateBtn} = useSelector(state=>state.post)
  const classes = useStyles();
  const update=()=>{
    setCurrentId(post._id)
    dispatch(updateIt())
  }
  return (
    <Card className={classes.card}>
      {updateBtn&&<Form currentId={currentId} setCurrentId={setCurrentId}/>}
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography varient="h6">{Post.creator}</Typography>
        <Typography variant="body2">{post.creator}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={update}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags?.map((tags) => `#${tags}`)}
        </Typography>
      </div>
      <Typography varient="h5" className={classes.title} gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
      <Typography varient="body2" color='textSecondary' component='p'>
        {post.message}
      </Typography>
      </CardContent>
      <CardContent className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post._id))}
        >
          <ThumbUpAltIcon fontSize="small" />
          Like
          {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default Post;
