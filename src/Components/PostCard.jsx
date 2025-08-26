import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import PostHeader from "./Card/PostHeader.jsx";
import PostUpdate from "./PostUpdate";
import PostBody from "./Card/PostBody.jsx";
import PostFooter from "./Card/PostFooter";
import Comment from "../Components/Comment.jsx";
import { createCommentApi } from "../Services/commentService.js";
import PostOptionsDropdown from "./PostOptionsDropdown.jsx";
import { deletePostApi } from "../Services/postServices.js";
import { Spinner } from "@heroui/react";

export default function PostCard({ post, commentLimit, callback }) {
  const { userData } = useContext(AuthContext);
  // const [comments, setComments] = useState([...]);
  const [editing, setEditing] = useState(false);
  const [newBody, setNewBody] = useState(post.body);
  const [newImage, setNewImage] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  async function handleDeletePost() {
    const response = await deletePostApi(post.id);
    if (!response.error) {
      callback?.();
      setDeleteModalOpen(false);
    } else {
      alert(response.error);
    }
  }

  const handleCommentUpdate = (updatedContent, commentId) => {
    if (updatedContent === null) {
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } else {
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, content: updatedContent } : c
        )
      );
    }
  };

  return (
    <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5 overflow-hidden">
      <div className="w-full h-16 flex justify-between items-center">
        <PostHeader
          photo={post.user.photo}
          name={post.user.name}
          date={post.createdAt}
        />

        {userData?._id === post.user._id && (
          <PostOptionsDropdown
            onEdit={() => setEditing(true)}
            onDelete={() => setDeleteModalOpen(true)}
          />
        )}
      </div>

      {editing ? (
        <PostUpdate
          post={post}
          newBody={newBody}
          setNewBody={setNewBody}
          newImage={newImage}
          setNewImage={setNewImage}
          setEditing={setEditing}
          updateLoading={updateLoading}
          callback={callback}
        />
      ) : (
        <PostBody body={post.body} image={post.image} />
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md w-80 text-center p-10">
            <p className="mb-4 font-semibold text-gray-800">
              Are you sure to delete this Post?
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={handleDeletePost}
                className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
              >
                Confirm
              </button>
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <PostFooter postId={post.id} commentNumber={post.comments.length} />

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          try {
            const response = await createCommentApi(commentContent, post.id);
            if (response.message) {
              setComments((prevComments) => [
                ...prevComments,
                response.comment,
              ]);
              setCommentContent("");
            }
          } catch (err) {
            console.error("Error adding comment:", err);
          } finally {
            setLoading(false);
          }
        }}
        className="flex gap-2 mt-2"
      >
        <input
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Comment..."
          className="border p-2 rounded-full border-divider flex-1"
        />
        <button
          type="submit"
          disabled={commentContent.length < 2 || loading}
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          {loading && <Spinner size="sm" className="ms-1" />}
          {loading ? "Loading..." : "Add Comment"}
        </button>
      </form>

      {comments.length > 0 &&
        comments
          .slice(0, commentLimit)
          .map((comment) => (
            <Comment
              postUserId={post.user._id}
              comment={comment}
              key={comment._id}
              postId={post.user._id}
              onUpdate={(content) => handleCommentUpdate(content, comment._id)}
            />
          ))}
    </div>
  );
}
