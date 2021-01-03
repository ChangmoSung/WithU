import React, { Fragment, useState, useEffect } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { getLights, deleteLight } from "../../../actions/users";
import ViewLightsModal from "../ViewLightsModal/index.js";

const LightsList = ({ isAuthenticated, lights, getLights, deleteLight }) => {
  useEffect(() => {
    getLights();
  }, [getLights]);

  const [isViewLightsModalVisible, toggleIsViewLightsModalVisible] = useState(
    false
  );
  const [lightsInfo, setLightsInfo] = useState({});

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="container">
      <div className="wrapper lightsList">
        <h2>My lights</h2>
        {lights &&
          lights.map(({ sender, senderEmail, lightsFromThisSender }, i) => (
            <Fragment key={i}>
              <div className="individualLight">
                <span className="fromWhom">
                  You have {lightsFromThisSender.length} lights from {sender}
                </span>
                <button
                  onClick={() => {
                    toggleIsViewLightsModalVisible(true);
                    setLightsInfo(lightsFromThisSender);
                  }}
                >
                  View
                </button>
                <button onClick={() => deleteLight(senderEmail)}>Delete</button>
              </div>
              {isViewLightsModalVisible && (
                <ViewLightsModal
                  toggleIsViewLightsModalVisible={
                    toggleIsViewLightsModalVisible
                  }
                  sender={sender}
                  senderEmail={senderEmail}
                  lightsInfo={lightsInfo}
                />
              )}
            </Fragment>
          ))}
      </div>
    </div>
  );
};

LightsList.propTypes = {
  lights: PropTypes.array,
  isAuthenticated: PropTypes.bool,
  getLights: PropTypes.func.isRequired,
  deleteLight: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lights: state.users.lights,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getLights, deleteLight })(LightsList);
