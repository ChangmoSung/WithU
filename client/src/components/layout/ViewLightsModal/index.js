import React, { Fragment, useState } from "react";
import "./index.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SendLightModal from "../SendLightModal/index.js";
import { deleteLight } from "../../../actions/users";

const ViewLightsModal = ({
  toggleIsViewLightsModalVisible,
  sender,
  senderEmail,
  lightsInfo,
  setLightsInfo,
  deleteLight,
}) => {
  const [receiverInfo, setReceiverInfo] = useState({
    personToReceiveLight: "",
    receiverName: "",
  });
  const [isSendLightModalVisible, toggleIsSendLightModalVisible] = useState(
    false
  );

  return (
    <Fragment>
      {isSendLightModalVisible ? (
        <SendLightModal
          toggleIsSendLightModalVisible={toggleIsSendLightModalVisible}
          receiverInfo={receiverInfo}
        />
      ) : (
        <div className="modal viewLightsModal">
          <button
            className="closeModalButton"
            onClick={() => toggleIsViewLightsModalVisible(false)}
          >
            X
          </button>
          <ul>
            {lightsInfo &&
              lightsInfo.map(({ _id, light, message }, i) => (
                <li key={i}>
                  <span className={`light ${light}Light`}></span>
                  <span>{message}</span>
                  <button
                    onClick={() => {
                      if (
                        window.confirm("Would you like to delete this light?")
                      ) {
                        setLightsInfo(
                          lightsInfo.filter(
                            ({ _id: lightId }) => lightId !== _id
                          )
                        );
                        deleteLight(_id);
                      }
                    }}
                  >
                    x
                  </button>
                </li>
              ))}
          </ul>
          <button
            className="replyButton"
            onClick={() => {
              setReceiverInfo({
                personToReceiveLight: senderEmail,
                receiverName: sender,
              });
              toggleIsSendLightModalVisible(true);
            }}
          >
            Reply to {sender}
          </button>
        </div>
      )}
    </Fragment>
  );
};

ViewLightsModal.propTypes = {
  toggleIsViewLightsModalVisible: PropTypes.func.isRequired,
  sender: PropTypes.string.isRequired,
  senderEmail: PropTypes.string.isRequired,
  lightsInfo: PropTypes.array.isRequired,
  setLightsInfo: PropTypes.func.isRequired,
  deleteLight: PropTypes.func.isRequired,
};

export default connect(null, { deleteLight })(ViewLightsModal);
