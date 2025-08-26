import React, { useContext, useState } from "react";
import PostHeader from "./Card/PostHeader.jsx";
import { AuthContext } from "../Context/AuthContext.js";
import { updateCommentApi, deleteCommentApi } from "../Services/commentService.js";

export default function Comment({ comment, postUserId, onUpdate }) {
  const { userData } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const result = await updateCommentApi(comment._id, content);
    setLoading(false);

    if (!result.error) {
      setIsEditing(false);
      onUpdate && onUpdate(content);
    } else {
      console.error(result.error);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteCommentApi(comment._id);
    setLoading(false);

    if (!result.error) {
      onUpdate && onUpdate(null);
    } else {
      console.error(result.error);
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="p-5 bg-gray-100 -mx-3 -mb-3 relative">
      <div className="flex justify-between">
        <div className="w-full h-16 flex justify-between items-center">
          <PostHeader
            photo={comment.commentCreator.photo}
            name={comment.commentCreator.name}
            date={comment.createdAt}
          />
        </div>

        {userData?._id === comment.commentCreator._id &&
          userData._id === postUserId && (
            <div className="relative">
              <svg
                className="w-16 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width={27}
                height={27}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#b0b0b0"
                strokeWidth={2}
                strokeLinecap="square"
                strokeLinejoin="round"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <circle cx={12} cy={12} r={1} />
                <circle cx={19} cy={12} r={1} />
                <circle cx={5} cy={12} r={1} />
              </svg>

              {dropdownOpen && (
                <div className="absolute  right-0 top-10 bg-white border rounded shadow-md z-10 border-divider flex flex-col">
                  <button
                    className="px-10 py-2 hover:bg-warning-500 text-left cursor-pointer"
                    onClick={() => {
                      setIsEditing(true);
                      setDropdownOpen(false);
                    }}
                  >
                    Edit Comment
                  </button>
                  <button
                    className="px-10 py-2 hover:bg-red-600 text-left cursor-pointer"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Comment
                  </button>
                </div>
              )}
            </div>
          )}
      </div>

      <div className="p-4 ps-5">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              className="border rounded px-2 py-1 flex-1"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
            />
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <p>{content}</p>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
            <p className="mb-4">Are you sure you want to delete this comment?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowDeleteModal(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
