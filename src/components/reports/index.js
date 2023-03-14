import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useActionData } from "react-router-dom";
import { getAuthUser } from "../../store/slices/authSlice";
import { getReports } from "../../store/slices/reportSlice";
import Modal from "../common/Modal";

const Index = ({ showAlert }) => {
  const actionData = useActionData();
  const authUser = useSelector(getAuthUser);
  const reports = useSelector(getReports);

  const [isAdmin, setIsAdmin] = useState(false);
  const [modal, setModal] = useState(null);

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

  const closeModal = () => {
    setModal(null);
  };

  useEffect(() => {
    if (authUser) {
      setIsAdmin(authUser.role === "admin");
    }
  }, [authUser]);

  useEffect(() => {
    if (actionData) {
      if (actionData.status === 200) {
        showAlert("success", actionData.message);
      } else {
        showAlert("danger", actionData.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <>
      {modal && (
        <Modal
          show={true}
          data={modal.data}
          action={modal.action}
          meta={modal.meta}
          closeModal={closeModal}
        />
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            {isAdmin && <th scope="col">Reported By</th>}
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports &&
            reports.map((report, index) => {
              return (
                <tr key={index}>
                  <td>{report.title}</td>
                  <td>{report.description}</td>
                  <td>{report.price}</td>
                  {isAdmin && <td>{report.user.name}</td>}
                  <td>
                    {report.approved === false ? (
                      <button
                        className="btn btn-success mr-2"
                        onClick={() =>
                          showModal(
                            "Report Approve",
                            "Are you sure you want to approve this report?",
                            "report-confirm",
                            report
                          )
                        }
                      >
                        <i className="fa fa-check" />
                      </button>
                    ) : (
                      <button
                        className="btn btn-default mr-2"
                        onClick={() =>
                          showModal(
                            "Report Reject",
                            "Are you sure you want to reject this report?",
                            "report-reject",
                            report
                          )
                        }
                      >
                        <i className="fa-solid fa-xmark" />
                      </button>
                    )}

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        showModal(
                          "Report Delete",
                          "Are you sure you want to delete this report?",
                          "report-delete",
                          report
                        )
                      }
                    >
                      <i className="fa fa-trash" />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Index;
