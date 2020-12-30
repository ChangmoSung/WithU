import React, { useState } from "react";
import "./index.scss";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signIn } from "../../../actions/auth";

const LandingPage = ({ signIn, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    signIn({ email, password });
  };

  if (isAuthenticated) return <Redirect to="/friendsList" />;

  return (
    <div className="container">
      <div className="wrapper landingPage">
        <h1>With U</h1>
        <p>I hope you'll have a wonderful day :)</p>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            onChange={onChange}
            placeholder="Email"
            aria-label="Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChange}
            placeholder="Password"
            aria-label="Password"
            required
          />
          <button>Log in</button>
        </form>
        <p>
          Don't have an account? <Link to="/signUpPage">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

LandingPage.propTypes = {
  signIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signIn })(LandingPage);
