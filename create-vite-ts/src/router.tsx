import { createBrowserRouter } from "react-router";
import Layout from "./components/layout.tsx";
import Home from "./pages/home.tsx";
import Employees from "./pages/employees.tsx";
import Employlee from "./pages/employee.tsx";
import About from "./pages/about.tsx";
import Admin from "./pages/admin.tsx";
import { getEmployeeById } from "./service/api/employee.ts";
import { employeesLoader } from "./loader.ts";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

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
        loader: employeesLoader(queryClient),
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
      {
        path: "admin",
        loader: employeesLoader(queryClient),
        element: <Admin />,
      },
    ],
  },
]);
