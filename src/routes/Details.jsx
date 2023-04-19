import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchPost, removePost } from "../state/postsSlice";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { postsReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id, postsReducer]);

  const removeHandler = useCallback(
    (id) => {
      dispatch(removePost(id)).then(() => {
        navigate("/");
      });
    },
    [dispatch, navigate]
  );

  return (
    <div>
      <div>
        <div className="border-b-2 mb-10 flex justify-between items-center">
          <h1 className="text-left text-2xl text-stone-800 py-2 px-6 pl-0">
            {postsReducer.post.title}
          </h1>
          <p className="flex text-xl">
            <Link
              to={`/posts/${postsReducer.post.id}/edit`}
              className="cursor-pointer mr-3"
            >
              <FiEdit />
            </Link>
            <span
              className="cursor-pointer"
              onClick={() => removeHandler(postsReducer.post.id)}
            >
              <FiTrash2 />
            </span>
          </p>
        </div>
        <p className="text-orange-200 text-md bg-slate-600 px-10 py-4 rounded">
          {postsReducer.post.content}
        </p>
      </div>
      <div className="flex justify-between">
        <span>Published: {postsReducer.post.originally_published}</span>
        <span>Updated: {postsReducer.post.last_updated}</span>
      </div>
    </div>
  );
};

export default PostDetails;
