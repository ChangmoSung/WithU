import React from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const MeaningOfLights = ({ isAuthenticated, showMeaningOfLights }) => {
  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="modal guideModal">
      <h2 className="meaningOfLightsTitle">Meaning Of Lights</h2>
      <ul>
        <li>
          <span className="light redLight"></span> means "I love you"
        </li>
        <li>
          <span className="light blueLight"></span> means "I believe in you"
        </li>
        <li>
          <span className="light greenLight"></span> means "Please stay healthy
          and safe"
        </li>
        <li>
          <span className="light orangeLight"></span> means "I encourage you"
        </li>
        <li>
          <span className="light purpleLight"></span> means "You are luxurious"
        </li>
        <li>
          <span className="light brownLight"></span> means "Be confident"
        </li>
      </ul>
      <button
        className="closeModalButton"
        onClick={() => showMeaningOfLights(false)}
      >
        x
      </button>
    </div>
  );
};

MeaningOfLights.propTypes = {
  isAuthenticated: PropTypes.bool,
  showMeaningOfLights: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(MeaningOfLights);
