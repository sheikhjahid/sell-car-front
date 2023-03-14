import { Suspense, useState } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import Alert from "../components/common/Alert";
import ReportList from "../components/reports/index";
import store from "../store";
import {
  confirmRejectReport,
  deleteReport,
  fetchReports,
} from "../store/slices/reportSlice";
const ReportsPage = () => {
  const responseData = useLoaderData();
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({
      type,
      message,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={responseData}>
          {() => (
            <>
              {alert && <Alert data={alert} />}
              <div className="container">
                <h3>Reports: List</h3>
                <ReportList showAlert={showAlert} />
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export const loader = async ({ params, request }) => {
  const response = await store.dispatch(fetchReports());
  if (response.payload.status !== 200) {
    throw json({ message: "Unable to load reports" }, { status: 500 });
  }

  return defer({
    reports: response.payload.data,
  });
};

export const action = async ({ params, request }) => {
  const requestData = await request.formData();
  const type = requestData.get("type");
  let response = null;
  let message = null;
  switch (type) {
    case "report-confirm": {
      const payload = {
        id: requestData.get("id"),
        approved: true,
      };
      response = await store.dispatch(confirmRejectReport(payload)).unwrap();
      if (response.status !== 200) {
        message = "Unable to confirm the report.";
      }
      message = "Report confirmed successfully.";
      break;
    }
    case "report-reject": {
      const payload = {
        id: requestData.get("id"),
        approved: false,
      };
      response = await store.dispatch(confirmRejectReport(payload)).unwrap();
      if (response.status !== 200) {
        message = "Unable to reject the report.";
      }
      message = "Report rejected successfully.";
      break;
    }
    case "report-delete": {
      const payload = {
        id: requestData.get("id"),
      };
      response = await store.dispatch(deleteReport(payload)).unwrap();
      if (response.status !== 200) {
        message = "Unable to remove the report.";
      }
      message = "Report removed successfully.";
      break;
    }
    default:
  }

  if (response.status !== 200) {
    return json({ message });
  }

  response = { ...response, message };
  console.log(response);

  return json(response);
};

export default ReportsPage;
