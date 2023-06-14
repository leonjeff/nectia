import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

export interface FormProps {
  company?: string;
  location?: string;
  position?: string;
  handlerChange: any;
  sendData: any;
  deleteData?: any;
  isEdit: boolean;
}

const JobForm = ({
  company,
  location,
  position,
  handlerChange,
  sendData,
  deleteData,
  isEdit,
}: FormProps) => {
  return (
    <Grid
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      noValidate
      autoComplete="off"
    >
      <Grid item sx={{ display: "flex", flexDirection: "row" }}>
        <FormControl sx={{ m: 2, width: "50%" }} variant="outlined">
          <FormHelperText>Company</FormHelperText>
          <TextField
            value={company}
            onChange={(e) => {
              handlerChange("company", e.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 2, width: "50%" }} variant="outlined">
          <FormHelperText>Location</FormHelperText>
          <TextField
            value={location}
            onChange={(e) => {
              handlerChange("location", e.target.value);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item sx={{ display: "flex", flexDirection: "row" }}>
        <FormControl sx={{ m: 2, width: "50%" }} variant="outlined">
          <FormHelperText>Position</FormHelperText>
          <TextField
            value={position}
            onChange={(e) => {
              handlerChange("position", e.target.value);
            }}
          />
        </FormControl>

      </Grid>
      <Grid
        item
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <FormControl sx={{ m: 5, width: "10%" }} variant="outlined">
          <Button variant="contained" onClick={sendData}>
            Save
          </Button>
        </FormControl>
        {isEdit && (
          <FormControl sx={{ m: 5, width: "10%" }} variant="outlined">
            <Button
              variant="contained"
              style={{ background: "red" }}
              onClick={deleteData}
            >
              Delete
            </Button>
          </FormControl>
        )}
      </Grid>
    </Grid>
  );
};

export { JobForm };

//gene
