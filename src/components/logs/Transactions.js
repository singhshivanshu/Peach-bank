import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DashTable from "../tables/TransactionsDashTable";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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
const useStylesForForm = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
}));

//

function Transactions() {
  const classes = useStyles();
  const classesForForm = useStylesForForm();

  const [fromAccountNumber, setFromAccountNumber] = useState("");
  const [toAccountName, setToAccountName] = useState("");
  const [amount, setAmount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [sortByName, setSortByName] = useState(false);
  const [sortByAmount, setSortByAmount] = useState(false);

  // getting data from local storage
  useEffect(() => {
    const history = JSON.parse(window.localStorage.getItem("transactions"))
      ? JSON.parse(window.localStorage.getItem("transactions"))
      : [];
    setTransactions(history);
  }, []);

  // function get called on the submission of form
  const addTransaction = (event) => {
    event.preventDefault();

    const transactionObject = {
      fromAccountNumber,
      toAccountName, 
      amount,
      date: new Date().toLocaleDateString(),
    };
    setTransactions(transactions.concat([transactionObject]));

    // to set transactions in local storage
    window.localStorage.setItem(
      "transactions",
      JSON.stringify(transactions.concat([transactionObject]))
    );

    setAmount("");
    setFromAccountNumber("");
    setToAccountName("");
  };

  // for checkbox
  const sortByNameHandler = (event) => {
    setSortByName(!sortByName);
    // sortng by beneficiary name
    !sortByName &&
      setTransactions(
        transactions.sort((a, b) =>
          a.toAccountName > b.toAccountName
            ? 1
            : b.toAccountName > a.toAccountName
            ? -1
            : 0
        )
      );

    sortByName &&
      setTransactions(
        transactions.sort((a, b) =>
          a.toAccountName < b.toAccountName
            ? 1
            : b.toAccountName < a.toAccountName
            ? -1
            : 0
        )
      );
  };

  const sortByAmountHandler = (event) => {
    setSortByAmount(!sortByAmount);

    //sorting by amount
    !sortByAmount &&
      setTransactions(
        transactions.sort((a, b) =>
          a.amount > b.amount ? 1 : b.amount > a.amount ? -1 : 0
        )
      );

    sortByAmount &&
      setTransactions(
        transactions.sort((a, b) =>
          a.amount < b.amount ? 1 : b.amount < a.amount ? -1 : 0
        )
      );
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            {" "}
            <h2>New Transactions</h2>
            <br />
            <form
              className={classesForForm.root}
              noValidate
              autoComplete="off"
              onSubmit={addTransaction}
            >
              <TextField
                type="number"
                required
                label="From (Account number)"
                variant="filled"
                value={fromAccountNumber}
                onChange={(e) => setFromAccountNumber(e.target.value)}
              />
              <br />
              <TextField
                required
                label="To (Account)"
                variant="filled"
                value={toAccountName}
                onChange={(e) => setToAccountName(e.target.value)}
              />
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
              <Button type="submit" variant="contained" color="primary">
                PAY
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sortByName}
                  onChange={sortByNameHandler}
                  name="sortByName"
                  color="primary"
                />
              }
              label={<b>SORT BY NAME </b>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sortByAmount}
                  onChange={sortByAmountHandler}
                  name="sortByAmount"
                  color="primary"
                />
              }
              label={<b>SORT BY AMOUNT</b>}
            />
          </FormGroup>
          <DashTable transactions={transactions} className={classes.paper} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Transactions;
