import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import LoadingScreen from "../components/LoadingScreen";
import { getMyPostsApi } from "../Services/profileService";
import Setting from "../Components/Setting";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getMyPosts() {
    setLoading(true);
    const data = await getMyPostsApi();
    if (data) {
      setPosts(data.posts);
    }
    setLoading(false);
  }

  useEffect(() => {
    getMyPosts();
  }, []);

  return <>
  <div className="w-11/12 max-w-10xl mx-auto mt-6 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-80 flex-shrink-0 border-r-2 border-gray-400 md:h-screen md:sticky md:top-0">
        <Setting />
      </div>

      {/* Posts */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold my-6">My Posts</h1>
        {loading ? (
          <LoadingScreen />
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              callback={getMyPosts}
              commentLimit={1}
            />
          ))
        ) : (
          <p className="text-center text-2xl text-gray-500 mt-6">
            There are no posts yet !
          </p>
        )}
      </div>
    </div>
  </>
}
