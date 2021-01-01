import React, { useState, useEffect, Fragment } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signOut } from "../../../actions/auth";

const Navbar = ({ signOut, auth: { isAuthenticated, loading } }) => {
  useEffect(() => {
    if (window.innerWidth <= 640) {
      toggleNav(false);
      makeNavOpenerVisible(true);
    }
  }, []);
  const [isNavVisible, toggleNav] = useState(true);
  const [isNavOpenerVisible, makeNavOpenerVisible] = useState(false);

  return (
    <Fragment>
      {isAuthenticated && !loading && isNavVisible && (
        <nav>
          <ul className="wrapper">
            <li>
              <Link
                to="friendsList"
                onClick={() => isNavOpenerVisible && toggleNav(!isNavVisible)}
              >
                Friends
              </Link>
            </li>
            <li>
              <Link
                to="lightsList"
                onClick={() => isNavOpenerVisible && toggleNav(!isNavVisible)}
              >
                Lights
              </Link>
            </li>
            <li>
              <button onClick={() => signOut()}>Sign out</button>
            </li>
          </ul>
        </nav>
      )}
      {isAuthenticated && !loading && isNavOpenerVisible && (
        <button className="navOpener" onClick={() => toggleNav(!isNavVisible)}>
          Open
        </button>
      )}
    </Fragment>
  );
};

Navbar.propTypes = {
  signOut: PropTypes.func,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signOut })(Navbar);
