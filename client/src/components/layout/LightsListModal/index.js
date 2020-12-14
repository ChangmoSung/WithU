import React, { Fragment, useState } from "react";
import "./index.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LightsReplyModal from "./LightsReplyModal/index.js";

const LightsListModal = ({ lights }) => {
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
              <span>From {sender}</span>
              <span className={light}></span>
              <span>Message: {message}</span>
              <button onClick={() => toggleLightsReplyModalVisibility(true)}>
                Reply
              </button>
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
};

const mapStateToProps = (state) => ({
  lights: state.users.lights,
});

export default connect(mapStateToProps)(LightsListModal);
