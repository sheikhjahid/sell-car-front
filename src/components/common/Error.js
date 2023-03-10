import { useEffect, useState } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const Error = () => {
  const routeError = useRouteError();
  const navigate = useNavigate();
  const [statusCode, setStatusCode] = useState("500");
  const [errorMessage, setErrorMessage] = useState("Something went wrong");

  useEffect(() => {
    if (routeError) {
      setStatusCode(routeError.status);
      setErrorMessage(routeError.data.message);
    }
  }, [navigate, routeError]);
  return (
    <>
      <h3>{statusCode}</h3>
      <p>
        <strong>{errorMessage}</strong>
      </p>
    </>
  );
};

export default Error;
