//@ts-nocheck
import { useState } from "react";
import "./App.css";

import { routes } from "./routes/Routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
