import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

function TransactionsDashTable(props) {
  const { transactions } = props;

  const classesForTable = useStylesforTable();

  return (
    <>
      {transactions && transactions.length > 0 ? (
        <TableContainer component={Paper}>
          <Table
            className={classesForTable.table}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>{"Beneficiary".toUpperCase()}</StyledTableCell>
                <StyledTableCell align="center">DATE</StyledTableCell>
                <StyledTableCell align="center">PAYMENT TYPE</StyledTableCell>
                <StyledTableCell align="center">AMOUNT</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions &&
                transactions.length > 0 &&
                Array.isArray(transactions) &&
                transactions.map((ele, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {ele.toAccountName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {ele.date}
                      </StyledTableCell>
                      <StyledTableCell align="center">DEBIT</StyledTableCell>
                      <StyledTableCell align="center">
                        Rs {ele.amount}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h2>No transactions yet.</h2>
      )}
    </>
  );
}
export default TransactionsDashTable;
