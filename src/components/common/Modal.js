import { useEffect, useRef } from "react";

const Modal = ({ show = false, data, confirm, close }) => {
  const openModalRef = useRef();
  const closeModalRef = useRef();

  const closeModal = () => {
    close();
  };

  const confirmModal = () => {
    closeModalRef.current.click();
    confirm();
  };

  useEffect(() => {
    if (show) {
      openModalRef.current.click();
    }
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
                onClick={closeModal}
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
                onClick={closeModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={confirmModal}
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
