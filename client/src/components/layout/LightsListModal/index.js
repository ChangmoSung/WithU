import React, { Fragment, useEffect } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { getLights, deleteLight } from "../../../actions/users";

const LightsListModal = ({
  isAuthenticated,
  lights,
  getLights,
  deleteLight,
}) => {
  useEffect(() => {
    getLights();
  }, [getLights]);

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="LightsListModal">
      <h2>Lights :)</h2>
      {lights && (
        <Fragment>
          {lights.map(({ sender, senderEmail, light, message }, i) => (
            <div key={i}>
              <span className={light}></span>
              <span>From {sender}</span>
              <span>{message}</span>
              <button>Reply</button>
              <button onClick={() => deleteLight(senderEmail)}>Delete</button>
            </div>
          ))}
        </Fragment>
      )}
    </div>
  );
};

LightsListModal.propTypes = {
  lights: PropTypes.array,
  isAuthenticated: PropTypes.bool,
  getLights: PropTypes.func.isRequired,
  deleteLight: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lights: state.users.lights,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getLights, deleteLight })(
  LightsListModal
);
