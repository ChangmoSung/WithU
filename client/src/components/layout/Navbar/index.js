import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signOut } from "../../../actions/auth";

const Navbar = ({ signOut, auth: { isAuthenticated, loading } }) =>
  isAuthenticated &&
  !loading && (
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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signOut })(Navbar);
