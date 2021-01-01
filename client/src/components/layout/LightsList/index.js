import React, { Fragment, useState, useEffect } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { getLights, deleteLight } from "../../../actions/users";
import SendLightModal from "../SendLightModal/index.js";

const LightsList = ({ isAuthenticated, lights, getLights, deleteLight }) => {
  const [isSendLightModalVisible, toggleIsSendLightModalVisible] = useState(
    false
  );
  const [receiverInfo, setReceiverInfo] = useState({
    personToReceiveLight: "",
    receiverName: "",
  });

  useEffect(() => {
    getLights();
  }, [getLights]);

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="container">
      <div className="wrapper lightsList">
        <h2>My lights</h2>
        {lights && (
          <Fragment>
            {lights.map(({ sender, senderEmail, light, message }, i) => (
              <div key={i} className="individualLight">
                <span className={`light ${light}Light`}></span>
                <span className="fromWhom">{sender}</span>
                <span className="messageContent">{message}</span>
                <button
                  onClick={() => {
                    setReceiverInfo({
                      personToReceiveLight: senderEmail,
                      receiverName: sender,
                    });
                    toggleIsSendLightModalVisible(true);
                  }}
                >
                  Reply
                </button>
                <button onClick={() => deleteLight(senderEmail)}>Delete</button>
              </div>
            ))}
            {isSendLightModalVisible && (
              <SendLightModal
                toggleIsSendLightModalVisible={toggleIsSendLightModalVisible}
                receiverInfo={receiverInfo}
              />
            )}
          </Fragment>
        )}
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