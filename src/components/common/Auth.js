import { redirect } from "react-router-dom";

export const loader = async ({ params, request }) => {
  const localStorageData = JSON.parse(localStorage.getItem("data"));

  if (localStorageData && localStorageData?.token) {
    return null;
  }

  return redirect("/signin");
};
