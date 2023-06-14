import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { AgGridReact } from "ag-grid-react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { red } from "@mui/material/colors";

import IconButton from "@mui/material/IconButton";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { JobI } from "../../interfaces/job";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

export default function Jobs() {
  const token = localStorage.getItem("token");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<JobI[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (token) {
      fetch("https://retoolapi.dev/HLtTWb/jobs")
        .then((response) => response.json())
        .then((data) => setJobs(data));
    } else {
      navigate("/login");
    }
  }, [navigate, token]);

  var rowData = jobs?.map((job) => ({
    id: job.id,
    company: job.company,
    location: job.location,
    position: job.position,
  }));

  const [quickFilterValue, setQuickFilterValue] = useState('');

  const onFilterInput = (event: any) => {
    const { value } = event.target;
    setQuickFilterValue(value);
  };

  const [job, setJob] = useState<JobI>({
    company: "",
    location: "",
    position: "",
  });

  const deleteData = (id: any) => {
    fetch(`https://retoolapi.dev/HLtTWb/jobs/${id}`, {
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

  const RedDelete = red[500];

  const [columnDefs] = useState([
    {
      headerName: "Company",
      field: "company",
      flex: 1,
      resizable: true,
    },
    {
      headerName: "Location",
      field: "location",
      flex: 1,
      resizable: true,
    },
    {
      headerName: "Open Position",
      field: "position",
      flex: 1,
      resizable: true,
    },
    {
      headerName: "Actions",
      field: "id",
      flex: 1,
      resizable: true,
      cellRenderer: (params: any) => {
        return (
          <>
            <IconButton
              aria-label="edit"
              style={{
                background: "#2196f3",
                color: "white",
                borderRadius: "3px",
                padding: "3px",
                marginRight: "5px",
              }}
              href={"/jobs/" + params.value}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              style={{
                background: "red",
                color: "white",
                borderRadius: "3px",
                padding: "3px",
              }}
              onClick={deleteData}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ]);

  const [gridApi, setGridApi] = useState<any>(5);

  const onPaginationPageSize = (pageSize: any) => {
    setGridApi(pageSize);
  };

  return (
    <>
      {token ? (
        <Grid
          className="ag-theme-alpine"
          sx={{ p: 3, paddingTop: "100px", height: "80vh", width: "100%" }}
        >
          {location.pathname === "/jobs" ? (
            <>
              <Link to="new" className="add">
                Add New Job
              </Link>

              <input type="text" onChange={onFilterInput} placeholder="Enter filter text" />

              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={gridApi}
                quickFilterText={quickFilterValue}
              />
              <select
                onChange={(e) => {
                  onPaginationPageSize(e.target.value);
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </>
          ) : null}

          <Outlet />
        </Grid>
      ) : null}
    </>
  );
}
