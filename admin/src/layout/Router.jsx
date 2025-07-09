import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "./Layout";
import Slider from "../pages/Slider";
import About from "../pages/About";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "slider", element: <Slider /> },
      { path: "about", element: <About /> },
    ],
  },
]);

export default router;
