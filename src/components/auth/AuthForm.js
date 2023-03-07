import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import "./authform.css";
const AuthForm = ({ signup = true }) => {
  const submit = useSubmit();
  const navigation = useNavigation();

  const formErrorData = useActionData();

  const [formDetails, setFormDetails] = useState({});
  const [errors, setErrors] = useState({});

  const validate = (inputDetails) => {
    let errorBag = {};

    if (signup) {
      if (!inputDetails?.name) {
        errorBag["name"] = "Name is required.";
      }
    }

    if (inputDetails?.email) {
      if (
        /^([\w-\\.+]+@([\w-]+\.)+[\w-]{2,4})?$/.test(inputDetails.email) ===
        false
      ) {
        errorBag["email"] = "Invalid email address provided.";
      }
    } else {
      errorBag["email"] = "Email is required.";
    }

    if (inputDetails?.password) {
      if (signup && inputDetails.password.length < 6) {
        errorBag["password"] = "Password must be at least 6 characters.";
      }
    } else {
      errorBag["password"] = "Password is required.";
    }

    if (errorBag) {
      setErrors(errorBag);
    }
  };

  const inputChangeHandler = (e) => {
    const inputFormDetails = {
      ...formDetails,
      [e.target.name]: e.target.value,
    };
    validate(inputFormDetails);
    setFormDetails(inputFormDetails);
  };

  const isSubmitting = navigation.state === "submitting";

  const submitHandler = (e) => {
    e.preventDefault();
    submit(formDetails, { method: "POST" });
  };

  const setSubmitErrors = async () => {
    await setErrors({
      error:
        typeof formErrorData.message === "string"
          ? formErrorData.message
          : "Invalid Credentials",
    });
  };

  useEffect(() => {
    if (formErrorData !== undefined) {
      setSubmitErrors();
    }
    // eslint-disable-next-line
  }, [formErrorData]);

  return (
    <>
      <div className="row">
        <div className="mt-3 mx-auto col-10 col-md-8 col-lg-3 my-3">
          <h3>{signup ? "Register" : "Login"}</h3>
          <Form onSubmit={submitHandler}>
            {errors?.error && <p className="error">{errors.error}</p>}
            {signup && (
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className={`form-label ${
                    errors && errors?.name ? "error" : null
                  }`}
                >
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={inputChangeHandler}
                />
                {errors?.name && <p className="error">{errors.name}</p>}
              </div>
            )}

            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className={`form-label ${
                  errors && errors?.email ? "error" : null
                }`}
              >
                Email address
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={inputChangeHandler}
              />
              {errors?.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                className={`form-label ${
                  errors && errors?.password ? "error" : null
                }`}
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={inputChangeHandler}
              />
              {errors?.password && <p className="error">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
