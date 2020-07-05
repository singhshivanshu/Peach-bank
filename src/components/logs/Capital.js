import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CapitalDashTable from "../tables/CapitalDashTable";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DocumentUploader from "../actions/DocumentUploader";
import Modal from "react-bootstrap/Modal";

// For styling the elements of the component

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
  },
}));

const useStylesForFormControl = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "35ch",
  },
}));

const useStylesForForm = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
}));

function Capital() {
  const classes = useStyles();
  const classesForForm = useStylesForForm();
  const classesForFormControl = useStylesForFormControl();

  const [documents, setDocuments] = useState(null);
  const [file, setFile] = useState(null);
  const [parsedFile, setParsedFile] = useState(null);
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [capital, setCapital] = useState([]);

  // getting data from local storage
  useEffect(() => {
    const history = JSON.parse(window.localStorage.getItem("capital"))
      ? JSON.parse(window.localStorage.getItem("capital"))
      : [];
    setCapital(history);
  }, []);

  // changeing file to base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file); // read the binary data and encode it as base64 data url.
    });
  };

  // function get called on submission of form
  const addCapital = (event) => {
    event.preventDefault();

    const capitalObject = {
      documents,
      date: new Date().toLocaleDateString(),
      amount,
      file: parsedFile,
      status: "Approved",
    };
    setCapital(capital.concat([capitalObject]));

    // to set capital in local storage;
    window.localStorage.setItem(
      "capital",
      JSON.stringify(capital.concat([capitalObject]))
    );
    setShowModal(false);
    setParsedFile(null);

    setAmount("");
    setDocuments(null);
  };

  // setting file uploader input into button
  const onClickHandler = () => {
    document.getElementById("file-input").click();
  };
  // calling function to upload file
  const fileUploadHandler = (e) => {
    setFile(e.target.files[0]);
    setShowModal(true);
    getBase64(e.target.files[0]).then((base64) => {
      setParsedFile(base64);
    });
  };


  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            {" "}
            <h2 id="upload-heading">Upload Documents</h2>
            <form className={classesForForm.root}>
              <FormControl
                variant="filled"
                className={classesForFormControl.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Documents
                </InputLabel>
                <Select
                  label="Documents"
                  value={documents}
                  onChange={(e) => setDocuments(e.target.value)}
                >
                  <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                  <MenuItem value="Driving License">Driving License</MenuItem>
                  <MenuItem value="Passport">Passport</MenuItem>
                  <MenuItem value="Pan Card">Pan card</MenuItem>
                </Select>
                <br />
                <TextField
                  type="number"
                  required
                  label="Amount (Rs)"
                  variant="filled"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <br />
                <input
                  type="file"
                  id="file-input"
                  onChange={fileUploadHandler}
                />
                <Modal
                  size="lg"
                  show={showModal}
                  onHide={() => setShowModal(false)}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                      Preview
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <DocumentUploader file={file} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={addCapital}
                    >
                      CONFIRM
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Button
                  onClick={onClickHandler}
                  variant="contained"
                  color="primary"
                >
                  UPLOAD DOCUMENT
                </Button>
              </FormControl>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <CapitalDashTable capital={capital} className={classes.paper} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Capital;
