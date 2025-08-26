import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../Services/postServices";
import PostCard from "../Components/PostCard.jsx";
import LoadingScreen from "../Components/LoadingScreen.jsx";

export default function PostDetails() {
  const [post, setPost] = useState(null);
  let { id } = useParams();

  async function getPosts() {
    const response = await getSinglePost(id);
    if (response.message) {
      setPost(response.post);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="w-4/6 mx-auto">
        {post ? (
          <PostCard post={post} commentLimit={post.comments.length} />
        ) : (
          <LoadingScreen />
        )}
      </div>
    </>
  );
}
