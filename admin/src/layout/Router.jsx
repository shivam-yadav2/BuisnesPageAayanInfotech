import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Layout />,
    children: [{ path: "", element: <Dashboard /> }],
  },

  //   { path: "/", element: <Login /> },
]);

export default router;
