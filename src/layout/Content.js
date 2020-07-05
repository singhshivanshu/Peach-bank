import React from "react";
import SignUp from "../components/actions/SignUp";
import { Switch, Route } from "react-router-dom";
import PaymentLog from "../components/logs/PaymentLog";

function Content() {
  return (
    <Switch>
      <Route exact path="/" component={SignUp} />
      <Route path="/log" exact component={PaymentLog} />
    </Switch>
  );
}
export default Content;
