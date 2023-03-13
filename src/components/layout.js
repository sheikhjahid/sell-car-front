import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setAuthUser, setToken } from "../store/slices/authSlice";
import Navbar from "./common/Navbar";

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("data"));
    if (localStorageData) {
      if (localStorageData?.token) {
        dispatch(setToken(localStorageData.token));
      }
      if (localStorageData?.user) {
        dispatch(setAuthUser(localStorageData.user));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
