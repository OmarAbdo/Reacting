import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // React.StrictMode is optional but recommended for highlighting potential problems in an application
  // it will cause components to render twice in development mode
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
