import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JobI } from "../../interfaces/job";
import { JobForm, FormProps } from "./form";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const Detail = () => {
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState<JobI>({
    company: "",
    location: "",
    position: "",
  });

  useEffect(() => {
    fetch(`https://retoolapi.dev/HLtTWb/jobs/${id}`)
      .then((response) => response.json())
      .then((data) => setJob(data));
  }, [id]);

  const sendData = () => {
    fetch(`https://api-generator.retool.com/HLtTWb/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    })
      .then((response) => response.json())
      .then((data) => {
        setAlertSuccess(true);
        setMessage(
          "Job edited successfully! You'll be redirected to jobs page"
        );
        setTimeout(() => {
          navigate("/jobs");
        }, 2000);
      })
      .catch((error) => {
        setAlertError(true);
        setMessage("Error: Something wrong happened!");
      });
  };

  const deleteData = () => {
    fetch(`https://api-generator.retool.com/HLtTWb/jobs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    })
      .then((response) => response.json())
      .then((data) => {
        setAlertSuccess(true);
        setMessage("Job deleted successfully!");
        setTimeout(() => {
          navigate("/jobs");
        }, 2000);
      })
      .catch((error) => {
        setAlertError(true);
        setMessage("Error: Something wrong happened!");
      });
  };

  return (
    <Grid>
      <h1>Job Detail</h1>

      {alertSuccess && <Alert severity="success">{message}</Alert>}
      {alertError && <Alert severity="error">{message}</Alert>}
      <Link to="/jobs" className="add">
        View Jobs List
      </Link>
      <JobForm
        company={job?.company}
        location={job?.location}
        position={job?.position}

        handlerChange={<P extends keyof FormProps>(
          prop: P,
          value: FormProps[P]
        ) => {
          setJob({ ...job, [prop]: value });
        }}
        sendData={sendData}
        deleteData={deleteData}
        isEdit={true}
      />
    </Grid>
  );
};
export { Detail };
