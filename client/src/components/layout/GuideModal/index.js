import React, { useState, Fragment } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MeaningOfLights from "./MeaningOfLights/index.js";

const GuideModal = ({ isAuthenticated }) => {
  const [isMeaningOfLightsVisible, showMeaningOfLights] = useState(false);

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <Fragment>
      <div className="modal guideModal">
        <h2>Guide</h2>
        <ul>
          <li>You have to add users to your friends list to send lights</li>
          <li>You can send 3 lights at most to the same friend</li>
          <li>
            lights are gone from the "lights list" 24 hours after you send them
          </li>
          <li>You can send lights from either friends list or lights list</li>
          <li>
            See the meaning of each light{" "}
            <button
              style={{ padding: "0.5rem" }}
              onClick={() => showMeaningOfLights(true)}
            >
              here
            </button>
          </li>
        </ul>
      </div>
      {isMeaningOfLightsVisible && (
        <MeaningOfLights showMeaningOfLights={showMeaningOfLights} />
      )}
    </Fragment>
  );
};

GuideModal.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(GuideModal);
