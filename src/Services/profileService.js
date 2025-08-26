import axios from "axios";

export async function getMyPostsApi() {
  try {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts?limit=20`, 
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log("My posts:", data);
    return data;
  } catch (err) {
    console.log("Error fetching my posts:", err);
  }
}
