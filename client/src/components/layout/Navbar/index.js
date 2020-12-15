import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signOut } from "../../../actions/auth";

const Navbar = ({ signOut }) => (
  <nav>
    <ul>
      <li>
        <Link to="friendsList">Friends</Link>
      </li>
      <li>
        <Link to="lightsList">Lights</Link>
      </li>
      <li>
        <button onClick={() => signOut()}>Sign out</button>
      </li>
    </ul>
  </nav>
);

Navbar.propTypes = {
  signOut: PropTypes.func,
};

export default connect(null, { signOut })(Navbar);
