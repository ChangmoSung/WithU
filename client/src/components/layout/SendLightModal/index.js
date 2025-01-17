import React from "react";
import "./index.scss";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendLight } from "../../../actions/users";

const SendLightModal = ({
  sendLight,
  toggleIsSendLightModalVisible,
  receiverInfo: { personToReceiveLight, receiverName },
}) => {
  const onChange = (e) => {
    const light = e.target.value;
    if (window.confirm(`Would you like to send ${light} to ${receiverName}?`)) {
      const messages = {
        red: "I love you",
        blue: "I believe in you",
        green: "Please stay healthy and safe",
        orange: "I encourage you",
        purple: "You are luxurious",
        brown: "Be confident",
      };

      sendLight({
        personToReceiveLight,
        light,
        message: messages[light],
        removeLightAt: moment().add(24, "hours").toDate(),
      });
    }
  };

  return (
    <div className="modal">
      <button
        className="closeModalButton"
        onClick={() => toggleIsSendLightModalVisible(false)}
      >
        X
      </button>
      <span style={{ color: "black" }}>To {receiverName}</span>
      <form className="formToReplyLight">
        <label htmlFor="red" className="light redLight" />
        <input
          type="radio"
          name="light"
          value="red"
          id="red"
          onChange={onChange}
        />
        <label htmlFor="blue" className="light blueLight" />
        <input
          type="radio"
          name="light"
          value="blue"
          id="blue"
          onChange={onChange}
        />
        <label htmlFor="green" className="light greenLight" />
        <input
          type="radio"
          name="light"
          value="green"
          id="green"
          onChange={onChange}
        />
        <label htmlFor="orange" className="light orangeLight" />
        <input
          type="radio"
          name="light"
          value="orange"
          id="orange"
          onChange={onChange}
        />
        <label htmlFor="purple" className="light purpleLight" />
        <input
          type="radio"
          name="light"
          value="purple"
          id="purple"
          onChange={onChange}
        />
        <label htmlFor="brown" className="light brownLight" />
        <input
          type="radio"
          name="light"
          value="brown"
          id="brown"
          onChange={onChange}
        />
      </form>
    </div>
  );
};

SendLightModal.propTypes = {
  sendLight: PropTypes.func.isRequired,
};

export default connect(null, { sendLight })(SendLightModal);
