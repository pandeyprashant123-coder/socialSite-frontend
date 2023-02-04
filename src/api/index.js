import axios from "axios";
const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = async (newPost) => {
    try {
        return await axios.post(url, newPost);
    } catch (error) {
        console.log(error)
    }
};
