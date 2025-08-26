import React, { useState } from "react";

export default function PostOptionsDropdown({ onEdit, onDelete }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <svg
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-6 h-6 text-gray-400 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={12} cy={12} r={1} />
        <circle cx={19} cy={12} r={1} />
        <circle cx={5} cy={12} r={1} />
      </svg>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-divider rounded shadow-lg z-50 flex flex-col">
          <button
            onClick={() => {
              onEdit();
              setDropdownOpen(false);
            }}
            className="px-4 py-2 text-left cursor-pointer rounded hover:bg-warning-500"
          >
            Edit Post
          </button>
          <button
            onClick={() => {
              setDropdownOpen(false);
              onDelete();
            }}
            className="px-4 py-2 text-left cursor-pointer rounded hover:bg-red-600"
          >
            Delete Post
          </button>
        </div>
      )}
    </div>
  );
}
