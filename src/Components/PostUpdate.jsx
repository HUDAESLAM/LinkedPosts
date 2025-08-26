import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { updatePostApi } from "../Services/postServices";

export default function PostUpdate({
  post,
  newBody,
  setNewBody,
  newImage,
  setNewImage,
  setEditing,
  updateLoading,
  callback,
}) {
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!newImage) {
      setPreviewImage(null);
      return;
    }
    const objectUrl = URL.createObjectURL(newImage);
    setPreviewImage(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [newImage]);

  async function handleUpdatePost() {
    if (loading) return;
    setLoading(true);
    if (updateLoading) return;
    const response = await updatePostApi(post.id, newBody, newImage);
    setLoading(false);
    if (!response.error) {
      if (callback)
        callback({
          ...post,
          body: newBody,
          image: response.image || post.image,
        });
      setEditing(false);
      setNewImage(null);
      setPreviewImage(null);
    } else {
      alert(response.error);
    }
  }

  return (
    <div className="flex flex-col gap-2 my-2">
      <textarea
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
        className="border p-2 rounded"
        placeholder="Edit post text..."
      />

      {(previewImage || post.image) && (
        <div className="mb-2 text-center">
          <img
            src={previewImage || post.image}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-md mx-auto"
          />
        </div>
      )}

      <label className="flex flex-col text-center cursor-pointer">
        Change Image
        <input
          type="file"
          onChange={(e) => setNewImage(e.target.files[0])}
          className="hidden"
        />
      </label>

      <Button onClick={handleUpdatePost} isLoading={updateLoading}>
        {loading ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" />
            Updating...
          </div>
        ) : (
          "Update Post"
        )}
      </Button>
    </div>
  );
}
