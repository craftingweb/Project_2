import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="text-4xl">Oops!</h1>
      <p className="my-4 text-xl">
        Error 404,
        <i> {error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default Error;
