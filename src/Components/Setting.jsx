import React from "react";
import ChangePassword from "./ChangePassword";
import UploadProfilePhoto from "./UploadProfilePhoto";

export default function Settings() {
  return (
    <div className="my-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="cursor-pointer pe-5 mb-6"><UploadProfilePhoto /></div>
      <div className="cursor-pointer pe-5">
        <ChangePassword />
      </div>
    </div>
  );
}
