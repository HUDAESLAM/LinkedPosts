import { Button, Spinner } from "@heroui/react";
import { useState } from "react";
import { createPostApi } from "../Services/postServices.js";
// import { set } from "zod";

export default function CreatePost({ callback }) {
  const [postBody, setPostBody] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);



  async function CreatePost(e) {
    e.preventDefault();

    // if (!postBody.trim() && !image) return;
    // console.log(postBody, image);
    setLoading(true);
    const formData = new FormData();
    if (postBody) formData.append("body", postBody);
  if (image) formData.append("image", image);

    const response = await createPostApi(formData);
    if (response?.message) {
      await callback();
      setPostBody("");
      setImageUrl("");
    }

    setLoading(false);
  }

  function handleImage(e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
    e.target.value = "";
  }

  

  return (
    <>
      <div className="bg-white rounded-md shadow-md  py-3 px-3 my-5 overflow-hidden relative">
        <form onSubmit={CreatePost}>
          <textarea
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-md p-4 resize-none bg-gray-100"
            rows={3}
            placeholder="What's on your mind?"
          ></textarea>

          {imageUrl && (
            <div className="relative my-3 ">
              <img src={imageUrl} alt="" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 absolute top-4 end-4 text-white cursor-pointer"
                onClick={() => setImageUrl("")}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          )}
          <div className="flex justify-between items-center ">
            <label className="mr-3 cursor-pointer hover:text-blue-500 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Images
              <input onChange={handleImage} type="file" className="hidden" />
            </label>
            <Button color="primary" type="submit">
              Post
            </Button>
          </div>
        </form>

        {loading && (
          <div className="absolute inset-0 bg-white/70 flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
