import React, { Fragment, useState, useEffect } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { getLights, deleteLights } from "../../../actions/users";
import ViewLightsModal from "../ViewLightsModal/index.js";

const LightsList = ({ isAuthenticated, lights, getLights, deleteLights }) => {
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
                  {lightsFromThisSender.length} lights from {sender}
                </span>
                <div className="buttonsContainer">
                  <button
                    onClick={() => {
                      toggleIsViewLightsModalVisible(true);
                      setLightsInfo(lightsFromThisSender);
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() =>
                      window.confirm(
                        "Would you like to delete all lights from this user?"
                      ) && deleteLights(senderEmail)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
              {isViewLightsModalVisible && (
                <ViewLightsModal
                  toggleIsViewLightsModalVisible={
                    toggleIsViewLightsModalVisible
                  }
                  sender={sender}
                  senderEmail={senderEmail}
                  lightsInfo={lightsInfo}
                  setLightsInfo={setLightsInfo}
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
  deleteLights: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lights: state.users.lights,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getLights, deleteLights })(
  LightsList
);
