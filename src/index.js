import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Log from "./Pagine/Log";
import Home from "./Pagine/Home";
import ListaAmici from "./Pagine/ListaAmici";

const router = createBrowserRouter([
  {
    path: "/Login",
    element: <Log />,
  },
  {
    path: "/ListaAmici",
    element: <ListaAmici />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
