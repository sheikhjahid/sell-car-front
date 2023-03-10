import { useSelector } from "react-redux";
import { json } from "react-router-dom";
import store from "../store";
import { getAuthUser } from "../store/slices/authSlice";
import { fetchUsers } from "../store/slices/usersSlice";

const UsersPage = () => {
  return <>Users</>;
};

export const loader = async ({ params, request }) => {
  const response = store.dispatch(fetchUsers());

  // if (!store.auth.user) {
  //   throw json({ message: "Unable to find profile" }, { status: 404 });
  // }

  return null;
};

export default UsersPage;
