import React, { useEffect, useState } from "react";
import PostCard from "../Components/PostCard.jsx";
import { getAllPostsApi } from "../Services/postServices.js";
import LoadingScreen from "../Components/LoadingScreen.jsx";
import CreatePost from "../Components/CreatePost.jsx";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);

  async function getAllPosts() {
    const response = await getAllPostsApi();
    setPosts(response.posts);
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <div className="w-2xl mx-auto">
        <CreatePost callback={getAllPosts}/>

        {posts.length == 0 ? <LoadingScreen/> :
        posts.map((post) => <PostCard key={post.id} post={post} commentLimit={1} callback={getAllPosts}/> )
        }
      </div>
    </>
  );
}
