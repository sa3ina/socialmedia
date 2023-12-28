import Login from "../pages/Login";
import Register from "../pages/Register";
import UserRoot from "../pages/UserRoot";
import Home from "../pages/Home";
import Direct from "../pages/Direct";
import Search from "../pages/Search";
import Detail from "../pages/Detail";
import MyProfile from "../pages/MyProfile";
import Notifications from "../pages/Notifications";
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
      {
        path: "/direct",
        element: <Direct />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/:id",
        element: <Detail />,
      },
      {
        path: "/profile",
        element: <MyProfile />,
      },
      {
        path: "/notif",
        element: <Notifications />,
      },
    ],
  },
];
