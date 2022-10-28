import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import Approval from "./pages/Approval";
import Report from "./pages/Report";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <Layout>
        <User />
      </Layout>
    ),
  },
  {
    path: "/approval",
    element: (
      <Layout>
        <Approval />
      </Layout>
    ),
  },
  {
    path: "/report",
    element: (
      <Layout>
        <Report />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
