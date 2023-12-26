import Login from "../pages/Login";
import Register from "../pages/Register";
import UserRoot from "../pages/UserRoot";
import Home from "../pages/Home";
export const routes = [
  {
    path: "/",
    element: <UserRoot />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
];
