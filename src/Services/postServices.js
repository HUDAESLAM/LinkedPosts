import axios from "axios";

export async function getAllPostsApi() {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/posts?limit=40",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          sort: "-createdAt",
        },
      }
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getSinglePost(postId) {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/posts/" + postId,
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

export async function createPostApi(formData) {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/posts",
      formData,
      {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err.response?.data || err.message);
    return err;
  }
}


export async function updatePostApi(postId, body, image) {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("body", body);
    if (image) formData.append("image", image);

    const { data } = await axios.put(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      formData,
      {
        headers: { token },
      }
    );

    return data;
  } catch (error) {
    return { error: error?.response?.data?.error || "Something went wrong." };
  }
}



export async function deletePostApi(postId) {
  try {
    const { data } = await axios.delete(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (error) {
    return { error: error?.response?.data?.error || "Something went wrong." };
  }
}
