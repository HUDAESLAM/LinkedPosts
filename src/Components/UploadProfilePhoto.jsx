import React, { useEffect, useState } from "react";
import { uploadProfilePhotoApi } from "../Services/authServices.js";
import { Spinner } from "@heroui/react";

export default function UploadProfilePhoto() {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 4 * 1024 * 1024) {
      setMessage("File size must be less than 4MB.");
      setIsSuccess(false);
      setPhoto(null);
      return;
    }
    setPhoto(file);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!photo) {
      setMessage("Please select a photo to upload.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    const response = await uploadProfilePhotoApi(photo);
    if (response.error) {
      setMessage(response.error);
      setIsSuccess(false);
    } else {
      setMessage("Profile photo uploaded successfully!");
      setIsSuccess(true);
      setPhoto(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!photo) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(photo);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="p-4 border border-divider rounded-md w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Upload Profile Photo</h2>
      <label className="bg-gray-200 p-2 rounded-full cursor-pointer mb-3 block text-center">
        Choose Your Profile
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-3 hidden"
        />
      </label>
      {preview && (
        <div className="mb-3 text-center">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full mx-auto border"
          />
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mx-auto block rounded-t-full px-5"
      >
        {loading && <Spinner size="sm" />}
        {loading ? "Uploading..." : "Upload Photo"}
      </button>
      {message && (
        <p
          className={`mt-2 text-center ${
            isSuccess ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
