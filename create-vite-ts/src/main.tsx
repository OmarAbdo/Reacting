import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/home.tsx";
import Employees from "./pages/employees.tsx";
import About from "./pages/about.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";

// Routes are configured as the first argument to createBrowserRouter. At a minimum, you need a path and component:
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/employees",
    element: <Employees />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
