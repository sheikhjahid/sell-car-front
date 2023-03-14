import { useState } from "react";
import { json } from "react-router-dom";
import Alert from "../components/common/Alert";
import Profile from "../components/users/profile";
import store from "../store";
import { setAuthUser } from "../store/slices/authSlice";
import { updateProfile } from "../store/slices/usersSlice";

const ProfilePage = () => {
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
        <h3>Users: Profile</h3>
        <Profile showAlert={showAlert} />
      </div>
    </>
  );
};

export const action = async ({ params, request }) => {
  const requestData = await request.formData();
  const formData = new FormData();

  formData.append("name", requestData.get("name"));
  formData.append("email", requestData.get("email"));
  formData.append("password", requestData.get("password"));
  formData.append("file", requestData.get("file"));

  const response = await store.dispatch(updateProfile(formData)).unwrap();

  if (response.status !== 200) {
    return json(response.data);
  }

  await store.dispatch(
    setAuthUser({
      name: response.data.name,
      email: response.data.email,
      picUrl: response.data.picUrl,
      role: response.data.role.name,
    })
  );

  return json(response);
};

export default ProfilePage;
