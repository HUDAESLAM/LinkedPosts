import axios from "axios";

export async function sendRegisterData(userData) {
  try {
    let { data } = await axios.post(
      `https://linked-posts.routemisr.com/users/signup`,
      userData
    );
    console.log(data);
    return data;
  } catch (error) {
    const errorMsg =
      error?.response?.data?.error || "Something went wrong. Please try again.";
    return { error: errorMsg };
  }
}

export async function sendLoginData(userData) {
  try {
    let { data } = await axios.post(
      `https://linked-posts.routemisr.com/users/signin`,
      userData
    );
    console.log(data);
    return data;
  } catch (error) {
    const errorMsg =
      error?.response?.data?.error || "Something went wrong. Please try again.";
    return { error: errorMsg };
  }
}

export async function sendUserDataApi() {
  try {
    let { data } = await axios.get(
      `https://linked-posts.routemisr.com/users/profile-data`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    const errorMsg =
      error?.response?.data?.error || "Something went wrong. Please try again.";
    return { error: errorMsg };
  }
}


export async function changePasswordApi({ password, newPassword }) {
  try {
    const token = localStorage.getItem("token"); 
    const { data } = await axios.patch(
      "https://linked-posts.routemisr.com/users/change-password",
      { password, newPassword },
      {
        headers: {
          token: token,
        },
      }
    );
    return data; 
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Something went wrong. Please try again.",
    };
  }
}

export async function uploadProfilePhotoApi(photoFile) {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("photo", photoFile);

    const { data } = await axios.put(
      "https://linked-posts.routemisr.com/users/upload-photo",
      formData,
      {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data; 
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Something went wrong. Please try again.",
    };
  }
}