import { json } from "react-router-dom";
import store from "../store";
import { fetchUsers, removeProfile } from "../store/slices/usersSlice";
import Users from "../components/users";
import { useState } from "react";
import Alert from "../components/common/Alert";
const UsersPage = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({
      type,
      message,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      {alert && <Alert data={alert} />}
      <div className="container">
        <h3>Users: List</h3>
        <Users showAlert={showAlert} />
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

export const action = async ({ params, request }) => {
  const requestData = await request.formData();

  const payload = {
    email: requestData.get("email"),
  };

  const response = await store.dispatch(removeProfile(payload)).unwrap();

  if (response.status !== 200) {
    return json(response.data);
  }

  await store.dispatch(fetchUsers());

  return json(response);
};

export default UsersPage;
