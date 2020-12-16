import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./components/styles/styles.scss";
import Navbar from "./components/layout/Navbar/index.js";
import LandingPage from "./components/layout/LandingPage/index.js";
import SignUpPage from "./components/layout/SignUpPage/index.js";
import FriendsListModal from "./components/layout/FriendsListModal/index.js";
import LightsListModal from "./components/layout/LightsListModal/index.js";
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
        <Navbar />
        <div className="container">
          <Route exact path="/" component={LandingPage} />
          <Alert />
          <Switch>
            <Route exact path="/lightsList" component={LightsListModal} />
            <Route exact path="/friendsList" component={FriendsListModal} />
            <Route exact path="/signUpPage" component={SignUpPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
