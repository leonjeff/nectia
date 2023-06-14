import { useState } from "react";
import { JobI } from "../../interfaces/job";
import { JobForm, FormProps } from "./form";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NewJob = () => {
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [job, setJob] = useState<JobI>({
    company: "",
    location: "",
    position: "",
  });

  const addNewJob = () => {
    fetch("https://retoolapi.dev/HLtTWb/jobs", {
      method: "POST",
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

  return (
    <Grid>
      <h1>Add New Job</h1>

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
        sendData={addNewJob}
        isEdit={false}
      />
    </Grid>
  );
};
export { NewJob };
