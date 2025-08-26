import React, { useState } from "react";
// import { XMarkIcon } from "@heroicons/react/24/solid";

export default function PostBody({ body, image }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {body && <h2 className="mb-2">{body}</h2>}

      {image && (
        <>
          <img
            className="w-full h-75 object-cover cursor-pointer"
            src={image}
            alt="ImagePost"
            onClick={() => setModalOpen(true)}
          />

          {modalOpen && (
            <div
              className="fixed inset-0 bg-white/70  flex items-center justify-center z-50"
              onClick={() => setModalOpen(false)}
            >
              <button
                className="absolute top-2 right-2 text-white bg-black/70 bg-opacity-50 rounded-full p-2"
                onClick={() => setModalOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={image}
                alt="FullSize"
                className="max-h-[90%] max-w-[90%] object-contain rounded-md"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
