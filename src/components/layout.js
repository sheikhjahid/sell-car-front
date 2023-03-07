import { Outlet } from "react-router-dom";
import Navbar from "./common/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
