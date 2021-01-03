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
        <li>Red is "I love you"</li>
        <li>Blue is "I believe in you"</li>
        <li>Green is "Please stay healthy and safe"</li>
        <li>Orange is "I encourage you"</li>
        <li>Purple is "You are luxurious"</li>
        <li>Brown is "Be confident"</li>
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
