import { json } from "react-router-dom";
import store from "../store";
import { fetchUsers, removeProfile } from "../store/slices/usersSlice";
import Users from "../components/users";
import { useState } from "react";
import Modal from "../components/common/Modal";
import { useDispatch } from "react-redux";
import Alert from "../components/common/Alert";
const UsersPage = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState(null);

  const showModal = (title, message, user) => {
    setSelectedUser(user);
    setModal({
      title,
      message,
    });
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModal(null);
  };

  const confirm = async () => {
    await dispatch(removeProfile({ email: selectedUser.email })).unwrap();

    closeModal();

    await dispatch(fetchUsers());

    setAlert({
      type: "success",
      message: "User removed successfully",
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      {modal && (
        <Modal show={true} data={modal} confirm={confirm} close={closeModal} />
      )}
      {alert && <Alert data={alert} />}
      <div className="container">
        <h3>Users: List</h3>
        <Users showModal={showModal} />
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
