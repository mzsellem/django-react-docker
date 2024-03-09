import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./routes/home";

const rootElement = document.getElementById("root");

if (rootElement) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    //  {
    //     path: "/patients",
    //     element: <Patients />,
    //  },
  ]);

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  throw new Error("Root element not found in the document");
}
