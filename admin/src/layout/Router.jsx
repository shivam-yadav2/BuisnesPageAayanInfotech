import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "./Layout";
import Slider from "../pages/Slider";
import About from "../pages/About";
import Services from "../pages/Services";
import Testimonial from "../pages/Testimonial";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "slider", element: <Slider /> },
      { path: "about", element: <About /> },
      { path: "service", element: <Services /> },
      { path: "testimonial", element: <Testimonial /> },
      { path: "contact-inquiry", element: <Contact /> },
    ],
  },
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Register />
  }
]);

export default router;
