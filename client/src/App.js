import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./components/styles/styles.scss";
import Navbar from "./components/layout/Navbar/index.js";
import GuideModal from "./components/layout/GuideModal/index.js";
import LandingPage from "./components/layout/LandingPage/index.js";
import SignUpPage from "./components/layout/SignUpPage/index.js";
import FriendsList from "./components/layout/FriendsList/index.js";
import LightsList from "./components/layout/LightsList/index.js";
import Alert from "./components/layout/Alert/index.js";
import PrivateRoute from "./components/routing/PrivateRoute/index.js";

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
        <PrivateRoute component={Navbar} />
        <div className="container">
          <Route exact path="/" component={LandingPage} />
          <Alert />
          <Switch>
            <Route exact path="/signUpPage" component={SignUpPage} />
            <PrivateRoute exact path="/guide" component={GuideModal} />
            <PrivateRoute exact path="/lightsList" component={LightsList} />
            <PrivateRoute exact path="/friendsList" component={FriendsList} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
