import React, { useState } from "react";
import { changePasswordApi } from "../Services/authServices.js";
// import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showLoginBtn, setShowLoginBtn] = useState(false);

  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match!");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    const response = await changePasswordApi({ password, newPassword });

    if (response.error) {
      setMessage(response.error);
      setIsSuccess(false);
    } else {
      setMessage("Password changed successfully!");
      setIsSuccess(true);
      setShowLoginBtn(true);
      localStorage.removeItem("token"); 
    }

    setLoading(false);
  };

  // const handleLoginAgain = () => {
  //   navigate("/login");
  // };

  return (
    <div className="p-4 border border-divider rounded-md w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="password"
          placeholder="Current Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-divider p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 border-divider rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-divider p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading }
          className="bg-blue-500 rounded-t-full text-white p-2  hover:bg-blue-600"
        >
          {loading && <Spinner size="sm" />}
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>

      {message && (
        <p className={`mt-2 text-center ${isSuccess ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}

      {/* {showLoginBtn && (
        <div className="mt-4 text-center">
          <button
            onClick={handleLoginAgain}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Login Again
          </button>
        </div>
      )} */}
    </div>
  );
}
