import React, { useState, useEffect, Fragment } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signOut } from "../../../actions/auth";

const Navbar = ({ signOut }) => {
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
      {isNavVisible && (
        <nav>
          <ul>
            <li>
              <Link
                to="guide"
                onClick={() => isNavOpenerVisible && toggleNav(!isNavVisible)}
              >
                Guide
              </Link>
            </li>
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
              <button
                onClick={() => {
                  if (window.confirm("Would you like to sign out?")) {
                    signOut();
                    toggleNav(false);
                  }
                }}
              >
                Sign out
              </button>
            </li>
          </ul>
        </nav>
      )}
      {isNavOpenerVisible && (
        <button className="navOpener" onClick={() => toggleNav(!isNavVisible)}>
          Open
        </button>
      )}
    </Fragment>
  );
};

Navbar.propTypes = {
  signOut: PropTypes.func,
};

export default connect(null, { signOut })(Navbar);
