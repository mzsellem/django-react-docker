import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./routes/home";
import Patients from "./routes/patients";
import Footer from "./components/footer"

const rootElement = document.getElementById("root");

if (rootElement) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
     {
        path: "/patients",
        element: <Patients />,
     },
  ]);

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
      <Footer />
    </React.StrictMode>
  );
} else {
  throw new Error("Root element not found in the document");
}
