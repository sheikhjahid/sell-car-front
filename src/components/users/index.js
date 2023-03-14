import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useActionData } from "react-router-dom";
import { getUsers } from "../../store/slices/usersSlice";
import Modal from "../common/Modal";
const Index = ({ showAlert }) => {
  const actionData = useActionData();
  const users = useSelector(getUsers);
  const [modal, setModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const showModal = (title, message, action, meta) => {
    setModal({
      data: {
        title,
        message,
      },
      action,
      meta,
    });
  };

  const closeModal = (submit) => {
    setModal(null);
    if (submit === true) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (actionData) {
      setIsLoading(false);
      if (actionData.status === 200) {
        showAlert("success", "User removed successfully");
      } else {
        showAlert("danger", "Unable to remove user.");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);
  return (
    <>
      {isLoading && <p id="loading-indicator" />}
      {modal && (
        <Modal
          show={true}
          data={modal.data}
          action={modal.action}
          meta={modal.meta}
          closeModal={closeModal}
        />
      )}
      {users && (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          showModal(
                            "User Delete",
                            "Are you sure you want to delete this user",
                            "user-delete",
                            user
                          )
                        }
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Index;
