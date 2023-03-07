import { redirect } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import store from "../store";
import { signup } from "../store/slices/authSlice";
const Signup = () => {
  return (
    <>
      <AuthForm />
    </>
  );
};

export const action = async ({ params, request }) => {
  const formData = await request.formData();

  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const response = await store.dispatch(signup(payload)).unwrap();
  if (response.status === 201) {
    return redirect("/");
  }

  return response.data;
};

export default Signup;
