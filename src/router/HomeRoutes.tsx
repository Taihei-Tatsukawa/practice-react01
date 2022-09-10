import { Home } from "../components/pages/Home";
import { Setting } from "../components/pages/Setting";
import { UserManagement } from "../components/pages/UserManagement";

export const homeRoutes = [
  {
    path: "",
    index: true,
    element: <Home />,
  },
  {
    path: "user_management",
    index: false,
    element: <UserManagement />,
  },
  {
    path: "setting",
    index: false,
    element: <Setting />,
  },
];
