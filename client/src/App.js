import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./components/styles/styles.scss";
import LandingPage from "./components/layout/LandingPage/index.js";
import MainPage from "./components/layout/MainPage/index.js";
import SignUpPage from "./components/layout/SignUpPage/index.js";
import Alert from "./components/layout/Alert/index.js";

import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Alert />
        <Switch>
          <Route exact path="/mainPage" component={MainPage} />
          <Route exact path="/signUpPage" component={SignUpPage} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
