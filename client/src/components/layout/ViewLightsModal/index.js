import React, { Fragment, useState } from "react";
import "./index.scss";
import PropTypes from "prop-types";
import SendLightModal from "../SendLightModal/index.js";

const ViewLightsModal = ({
  toggleIsViewLightsModalVisible,
  sender,
  senderEmail,
  lightsInfo,
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
      <div className="modal viewLightsModal">
        <button
          className="closeModalButton"
          onClick={() => toggleIsViewLightsModalVisible(false)}
        >
          X
        </button>
        <ul>
          {lightsInfo &&
            lightsInfo.map(({ light, message }, i) => (
              <li key={i}>
                <span className={`light ${light}Light`}></span>
                <span>{message}</span>
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
          Reply
        </button>
      </div>
      {isSendLightModalVisible && (
        <SendLightModal
          toggleIsSendLightModalVisible={toggleIsSendLightModalVisible}
          receiverInfo={receiverInfo}
        />
      )}
    </Fragment>
  );
};

ViewLightsModal.propTypes = {
  toggleIsViewLightsModalVisible: PropTypes.func.isRequired,
  sender: PropTypes.string.isRequired,
  senderEmail: PropTypes.string.isRequired,
  lightsInfo: PropTypes.array.isRequired,
};

export default ViewLightsModal;
