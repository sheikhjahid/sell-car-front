import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/common/Error";
import Layout from "./components/layout";
import Home from "./pages/home-page";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { action as SignupAction } from "./pages/Signup";
import { action as SignInAction } from "./pages/Signin";
import { loader as AuthLoader } from "./components/common/Auth";
import Users, { loader as UsersLoader } from "./pages/users-page";
import ProfilePage, {
  action as ProfileAction,
} from "./pages/profile-page";
import Reports from "./pages/reports-page";
import "./App.css";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home />, loader: AuthLoader },
        { path: "signup", element: <Signup />, action: SignupAction },
        { path: "signin", element: <Signin />, action: SignInAction },
        {
          path: "users",
          loader: AuthLoader,
          children: [
            { index: true, element: <Users />, loader: UsersLoader },
            {
              path: "profile",
              element: <ProfilePage />,
              action: ProfileAction,
            },
          ],
        },
        {
          path: "reports",
          loader: AuthLoader,
          children: [{ index: true, element: <Reports /> }],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
