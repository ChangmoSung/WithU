import React, { useState } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signUp } from "../../../actions/auth";
import PropTypes from "prop-types";

const SignUpPage = ({ signUp, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstName, lastName, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === password2) {
      signUp({ firstName, lastName, email, password });
    }
  };

  if (isAuthenticated) return <Redirect to="/friendsList" />;

  return (
    <div className="container">
      <div className="wrapper signUpPage">
        <h1>With U</h1>
        <p>Please sign up here :)</p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="firstName"
            onChange={onChange}
            placeholder="First name"
            aria-label="First name"
          />
          <input
            type="text"
            name="lastName"
            onChange={onChange}
            placeholder="Last name"
            aria-label="Last name"
          />
          <input
            type="email"
            name="email"
            onChange={onChange}
            placeholder="Email"
            aria-label="Email"
          />
          <input
            type="password"
            name="password"
            onChange={onChange}
            placeholder="Password"
            aria-label="Password"
          />
          <input
            type="password"
            name="password2"
            onChange={onChange}
            placeholder="Password2"
            aria-label="Password2"
          />
          <button>Sign up</button>
        </form>
        <Link to="/">Sign in</Link>
      </div>
    </div>
  );
};

SignUpPage.propTypes = {
  signUp: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signUp })(SignUpPage);
