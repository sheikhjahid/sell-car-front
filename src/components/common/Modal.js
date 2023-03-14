import { useEffect, useRef } from "react";
import { useSubmit } from "react-router-dom";

const Modal = ({ show = false, data, action, meta, closeModal }) => {
  const submit = useSubmit();

  const openModalRef = useRef();
  const closeModalRef = useRef();

  const confirm = async () => {
    if (action === "user-delete") {
      closeModalRef.current.click();
      await submit({ email: meta.email }, { method: "PUT" });
      close();
    }
  };

  const close = () => {
    closeModal();
  };

  useEffect(() => {
    if (show) {
      openModalRef.current.click();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <>
      <button
        ref={openModalRef}
        type="button"
        style={{ display: "none" }}
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onClick={close}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {data.title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{data.message}</div>
            <div className="modal-footer">
              <button
                ref={closeModalRef}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={close}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={confirm}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
