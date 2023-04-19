import React, { memo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPosts, removePost } from "../state/postsSlice";
import { FiEdit, FiTrash2 } from "react-icons/fi";
const Posts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { postsReducer } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, id]);

  const removeHandler = useCallback(
    (id) => {
      dispatch(removePost(id));
    },
    [dispatch]
  );
  return (
    <div className="text-center grid grid-cols-2 gap-6">
      {!postsReducer.loading ? (
        <React.Fragment>
          {postsReducer.posts.length > 0 ? (
            postsReducer.posts.map((post) => {
              return (
                <div className="bg-stone-400 p-4" key={post.id}>
                  <div className="border-b-2 flex justify-between items-center mb-10">
                    <h1 className="text-left text-2xl text-stone-800 py-2 px-6 pl-0 font-bold">
                      <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    </h1>
                    <p className="flex text-xl">
                      <Link
                        to={`/posts/${post.id}/edit`}
                        className="cursor-pointer mr-3"
                      >
                        <FiEdit />
                      </Link>
                      <span
                        className="cursor-pointer"
                        onClick={() => removeHandler(post.id)}
                      >
                        <FiTrash2 />
                      </span>
                    </p>
                  </div>
                  <p className="text-orange-200 text-md bg-slate-600 px-10 py-4 rounded">
                    {post.content}
                  </p>
                  <p className="flex justify-between mt-6">
                    <span>Published: {post.originally_published}</span>
                    <span>Updated: {post.last_updated}</span>
                  </p>
                </div>
              );
            })
          ) : (
            <div className="col-span-2">
              <h1 className="text-4xl font-bold text-center">No Posts</h1>
              <button className="px-6 py-2 bg-slate-900 text-white rounded mt-6">
                <Link to="/add">Create Post</Link>
              </button>
            </div>
          )}
        </React.Fragment>
      ) : (
        <div className="col-span-2 text-4xl font-bold text-center">
          loading....
        </div>
      )}
    </div>
  );
};

export default memo(Posts);
