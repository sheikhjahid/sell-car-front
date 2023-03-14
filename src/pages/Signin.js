import { json, redirect } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import store from "../store";
import { signin } from "../store/slices/authSlice";
const Signin = () => {
  return (
    <>
      <AuthForm signup={false} />
    </>
  );
};

export const action = async ({ params, request }) => {
  const formData = await request.formData();

  const payload = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const response = await store.dispatch(signin(payload)).unwrap();

  if (response.status === 201) {
    return redirect("/");
  }

  return json(response.data);
};

export default Signin;
