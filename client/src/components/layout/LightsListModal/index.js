import React, { Fragment } from "react";
import "./index.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const LightsListModal = ({ lights }) => {
  return (
    <div className="LightsListModal">
      <h2>Lights :)</h2>
      {lights && (
        <Fragment>
          {lights.map(({ sender, light, message }, i) => (
            <div key={i}>
              <span>From {sender}</span>
              <span className={light}></span>
              <span>Message: {message}</span>
              <button>Reply</button>
            </div>
          ))}
        </Fragment>
      )}
    </div>
  );
};

LightsListModal.propTypes = {
  lights: PropTypes.array,
};

const mapStateToProps = (state) => ({
  lights: state.users.lights,
});

export default connect(mapStateToProps)(LightsListModal);
