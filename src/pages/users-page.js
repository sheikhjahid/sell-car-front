import { json } from "react-router-dom";
import store from "../store";
import { fetchUsers } from "../store/slices/usersSlice";
import Users from "../components/users";
import { useState } from "react";
const UsersPage = () => {

  const [modal, setModal] = useState({});

  const showModal = (title, message) => {
    setModal({
      title,
      message
    })
  }

  return (
    <>
      <div className="container">
        <h3>Users: List</h3>
        <Users />
      </div>
    </>
  );
};

export const loader = async ({ params, request }) => {
  const response = await store.dispatch(fetchUsers());

  if (response.payload.status !== 200) {
    throw json({ message: "Unable to load users" }, { status: 500 });
  }
  return null;
};

export default UsersPage;
