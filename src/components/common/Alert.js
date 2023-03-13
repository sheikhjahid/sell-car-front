const Alert = ({ data }) => {
  return (
    <>
      {data && (
        <div
          className={`alert alert-${data.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{data.message}</strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Alert;
