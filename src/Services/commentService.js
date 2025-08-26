import axios from "axios";

export async function createCommentApi(commentContent, postId) {
  try {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/comments",
      {
        content: commentContent,
        post: postId,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}



export async function updateCommentApi(commentId, content) {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.put(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
      { content },
      { headers: { token } }
    );
    return data;
  } catch (error) {
    return { error: error?.response?.data?.error || "Something went wrong." };
  }
}

export async function deleteCommentApi(commentId) {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.delete(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
      { headers: { token } }
    );
    return data;
  } catch (error) {
    return { error: error?.response?.data?.error || "Something went wrong." };
  }
}

