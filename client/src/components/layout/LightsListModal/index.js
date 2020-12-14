import React, { Fragment, useState } from "react";
import "./index.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LightsReplyModal from "./LightsReplyModal/index.js";
import { deleteLight } from "../../../actions/users";

const LightsListModal = ({ lights, deleteLight }) => {
  const [
    lightsReplyModalVisibility,
    toggleLightsReplyModalVisibility,
  ] = useState(false);

  return (
    <div className="LightsListModal">
      <h2>Lights :)</h2>
      {lights && (
        <Fragment>
          {lights.map(({ sender, senderEmail, light, message }, i) => (
            <div key={i}>
              <p>
                <span className={light}></span> From {sender}
              </p>
              <p>Message: {message}</p>
              <div className="buttonContainer">
                <button onClick={() => toggleLightsReplyModalVisibility(true)}>
                  Reply
                </button>
                <button onClick={() => deleteLight(senderEmail)}>Delete</button>
              </div>
              {lightsReplyModalVisibility && (
                <LightsReplyModal
                  toggleLightsReplyModalVisibility={
                    toggleLightsReplyModalVisibility
                  }
                  personToReceiveLight={senderEmail}
                  receiverName={sender}
                />
              )}
            </div>
          ))}
        </Fragment>
      )}
    </div>
  );
};

LightsListModal.propTypes = {
  lights: PropTypes.array,
  deleteLight: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lights: state.users.lights,
});

export default connect(mapStateToProps, { deleteLight })(LightsListModal);
