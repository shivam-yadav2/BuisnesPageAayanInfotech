import React from "react";
import "./App.css";
import { Route, RouterProvider, Routes } from "react-router-dom";
import router from "./layout/Router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
