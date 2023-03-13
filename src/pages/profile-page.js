import { json } from "react-router-dom";
import Profile from "../components/users/profile";
import store from "../store";
import { setAuthUser } from "../store/slices/authSlice";
import { updateProfile } from "../store/slices/usersSlice";

const ProfilePage = () => {
  return (
    <>
      <div className="container">
        <Profile />
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
    })
  );

  return null;
};

export default ProfilePage;
