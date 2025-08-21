import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/layout.tsx";
import Home from "./pages/home.tsx";
import Employees from "./pages/employees.tsx";
import Employlee from "./pages/employee.tsx";
import About from "./pages/about.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { getEmployeeById, getEmployees } from "./service/api/employee.ts";

// Routes are configured as the first argument to createBrowserRouter. At a minimum, you need a path and component:
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "employees",
        loader: async () => {
          return await getEmployees();
        },
        element: <Employees />,
      },
      {
        path: "employees/:id",
        loader: async ({ params }) => {
          if (!params.id) {
            throw new Error("Error");
          }
          return await getEmployeeById(params.id);
        },
        element: <Employlee />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // React.StrictMode is optional but recommended for highlighting potential problems in an application
  // it will cause components to render twice in development mode
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
