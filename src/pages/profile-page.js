import { useSelector } from "react-redux";
import { json } from "react-router-dom";
import store from "../store";
import { getAuthUser } from "../store/slices/authSlice";

const ProfilePage = () => {
  const user = useSelector(getAuthUser);
  return <><div>
      <h3>{user.name}</h3>
    </div></>;
};

export const loader = async ({ params, request }) => {
  const currentStore = store.getState();
  if (!currentStore.auth.user) {
    throw json({ message: "Unable to find profile" }, { status: 404 });
  }

  return null;
};

export default ProfilePage;
