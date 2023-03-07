import { useRouteError } from "react-router-dom";

const Error = () => {
  const routeError = useRouteError();

  return (
    <>
      <h3>403</h3>
      <p>
        <strong>Error occured</strong>
      </p>
    </>
  );
};

export default Error;
