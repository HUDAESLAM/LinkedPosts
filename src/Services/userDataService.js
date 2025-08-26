import axios from "axios";

export async function getMyProfileApi() {
  try {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/users/profile-data`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (err) {
    console.log("Error fetching my profile:", err);
  }
}
