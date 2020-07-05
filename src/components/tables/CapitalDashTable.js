import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DocumentUploader from "../actions/DocumentUploader";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStylesforTable = makeStyles({
  table: {
    minWidth: 700,
  },
});

function CapitalDashTable(props) {
  const { capital } = props;
  const [showModal, setShowModal] = useState({});

  const classesForTable = useStylesforTable();

  return (
    <>
      {capital && capital.length > 0 ? (
        <TableContainer component={Paper}>
          <Table
            className={classesForTable.table}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>DOCUMENT</StyledTableCell>
                <StyledTableCell align="center">DATE</StyledTableCell>
                <StyledTableCell align="center">PREVIEW</StyledTableCell>
                <StyledTableCell align="center">AMOUNT</StyledTableCell>
                <StyledTableCell align="center">STATUS</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {capital &&
                capital.length > 0 &&
                Array.isArray(capital) &&
                capital.map((ele, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {ele.documents}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {ele.date}
                      </StyledTableCell>
                      <Modal
                        size="lg"
                        show={showModal[index]}
                        onHide={() => setShowModal({ index: false })}
                        aria-labelledby="example-modal-sizes-title-lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-modal-sizes-title-lg">
                            {ele.documents}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <DocumentUploader file={ele.file} />
                        </Modal.Body>
                        <Modal.Footer></Modal.Footer>
                      </Modal>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={() => setShowModal({ [index]: true })}
                        >
                          Preview
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Rs {ele.amount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {ele.status}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1>No transactions yet.</h1>
      )}
    </>
  );
}
export default CapitalDashTable;
