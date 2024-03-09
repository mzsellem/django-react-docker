import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./routes/home";

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

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
