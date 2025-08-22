import { createBrowserRouter } from "react-router";
import Layout from "./components/layout.tsx";
import Home from "./pages/home.tsx";
import Employees from "./pages/employees.tsx";
import Employlee from "./pages/employee.tsx";
import About from "./pages/about.tsx";
import { QueryClient } from "@tanstack/react-query";
import { getEmployeeById } from "./service/api/employee.ts";
import { employeeLoader } from "./loader.ts";
// Routes are configured as the first argument to createBrowserRouter. At a minimum, you need a path and component:
export const router = createBrowserRouter([
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
        loader: employeeLoader(new QueryClient()),
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
