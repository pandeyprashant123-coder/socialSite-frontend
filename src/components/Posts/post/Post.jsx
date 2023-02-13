import React ,{useState}from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import moment from 'moment';
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
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
  const user = JSON.parse(localStorage.getItem('profile'))
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };
  return (
    <Card className={classes.card}>
      {updateBtn&&<Form currentId={currentId} setCurrentId={setCurrentId}/>}
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography varient="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId ===post?.creator || user?.result?._id ===post?.creator)&&(
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={update}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}
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
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes/>
        </Button>
        {(user?.result?.googleId ===post?.creator || user?.result?._id ===post?.creator)&&(
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Post;
