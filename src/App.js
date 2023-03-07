import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/common/Error";
import Layout from "./components/layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { action as SignupAction } from "./pages/Signup";
import { action as SignInAction } from "./pages/Signin";
import { loader as AuthLoader } from "./components/common/Auth";
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
