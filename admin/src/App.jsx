import React from "react";
import "./App.css";
import { Route, RouterProvider, Routes } from "react-router-dom";
import router from "./layout/Router";
import MyState from "./context/MyState";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <MyState>
        <RouterProvider router={router} />
        <Toaster/>
      </MyState>
    </>
  );
}

export default App;
