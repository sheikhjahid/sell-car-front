import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getAuthUser } from "../../store/slices/authSlice";

const Profile = () => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const authUser = useSelector(getAuthUser);
  const actionData = useActionData();
  const [formDetails, setFormDetails] = useState({});

  const [errors, setErrors] = useState({});

  const validate = (inputDetails) => {
    let errorBag = {};

    if (!inputDetails?.name) {
      errorBag["name"] = "Name is required.";
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
      if (inputDetails.password.length < 6) {
        errorBag["password"] = "Password must be at least 6 characters.";
      }
    }

    if (errorBag) {
      setErrors(errorBag);
    }
  };

  const isSubmitting = navigation.state === "submitting";

  const inputChangeHandler = (e) => {
    const inputFormDetails = {
      ...formDetails,
      [e.target.name]: e.target.value,
    };
    validate(inputFormDetails);
    setFormDetails(inputFormDetails);
  };

  const fileChangeHandler = (e) => {
    setFormDetails({ ...formDetails, file: e.target.files[0] });
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    await submit(formDetails, {
      method: "PUT",
      encType: "multipart/form-data",
    });
  };

  useEffect(() => {
    if (authUser) {
      setFormDetails({
        ...formDetails,
        name: authUser.name,
        email: authUser.email,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  useEffect(() => {
    if (actionData) {
      setErrors({ ...errors, submitError: actionData.message });
    }

    return () => {
      setErrors({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <>
      <Form className="profile" onSubmit={submitFormHandler}>
        <h3>Users: Profile</h3>
        {errors?.submitError && <p className="error">{errors.submitError}</p>}
        <div className="mb-3 mt-3">
          <label
            htmlFor="exampleInputEmail1"
            className={`form-label ${errors && errors?.name ? "error" : null}`}
          >
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formDetails.name}
            onChange={inputChangeHandler}
          />
          {errors?.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputEmail1"
            className={`form-label ${errors && errors?.email ? "error" : null}`}
          >
            Email
          </label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={formDetails.email}
            onChange={inputChangeHandler}
          />
          {errors?.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputEmail1"
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
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Add a Pic ?
          </label>
          <input
            type="file"
            className="form-control"
            name="file"
            onChange={fileChangeHandler}
          />
        </div>
        <div className="mt-4">
          <button
            className="btn btn-warning"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default Profile;
