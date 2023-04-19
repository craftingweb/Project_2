import React from "react";
import ReactDOMClient from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state";

import "./index.css";
import RootLayout from "./routes/root";
import Error from "./routes/Error";
import Index from "./routes/Index";
import Posts from "./routes/Posts";
import Details from "./routes/Details";
import Add from "./routes/Add";
import Edit from "./routes/Edit";

// const navigate = useNavigate();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Index /> },
      { path: "posts", element: <Posts /> },
      { path: "add", element: <Add /> },
      {
        path: "posts/:id",
        element: <Details />,
        loader: ({ params }) => {
          if (isNaN(params.id)) {
            throw new Response("Bad Request", {
              status: 400,
              statusText:
                "Please make sure that you provided a valid id number.",
            });
          }
          return <Details />;
        },
      },
      { path: "posts/:id/edit", element: <Edit /> },
    ],
  },
]);

const container = document.querySelector("#root");
const root = ReactDOMClient.createRoot(container);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
