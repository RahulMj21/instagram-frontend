import SinglePost from "./SinglePost";
import { useEffect, useState } from "react";
import axios from "../axios";
import Pusher from "pusher-js";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await axios(`/posts`);
    const posts = await response.data;
    setPosts(posts);
  };
  const pusherId = process.env.REACT_APP_PUSHER_ID;
  const pusherCluster = process.env.REACT_APP_PUSHER_CLUSTER;

  useEffect(() => {
    const pusher = new Pusher("c04959f3d6abd77bd76b", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("posts");
    channel.bind("inserted", (data) => {
      if (data) {
        fetchPosts();
      }
    });
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts && posts.map((post) => <SinglePost id={post.id} {...post} />)}
    </div>
  );
};

export default Posts;
