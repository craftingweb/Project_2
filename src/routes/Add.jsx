import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../state/postsSlice";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(createPost({ title, content }))
        .unwrap()
        .then(() => {
          if (title && content) {
            navigate("/");
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    },
    [dispatch, title, content, navigate]
  );

  return (
    <div className="mt-6 m-auto bg-zinc-700/40 p-10 w-5/6 relative">
      <div
        className={`text-2xl absolute -top-[50px] bg-red-400 text-white py-2 px-4 w-full left-0 text-center ${
          errorMessage ? "block" : "hidden"
        }`}
      >
        {errorMessage === "Rejected"
          ? "Server is not responding"
          : errorMessage}
      </div>
      <form action="/create" onSubmit={handleSubmit}>
        <h1 className="mb-10 text-center font-bold text-4xl text-white uppercase">
          Create Post
        </h1>
        <input
          className="rounded bg-zinc-800 outline-none py-2 px-4 text-white placeholder:text-slate-400 w-full"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="rounded bg-zinc-800 outline-none py-2 px-4 text-white placeholder:text-slate-400 w-full my-6 h-64"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-slate-600 py-4 px-6 text-xl text-slate-100 rounded w-64 m-auto block"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
