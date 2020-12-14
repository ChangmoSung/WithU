import React from "react";
import "./index.scss";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLight } from "../../../../actions/users";

const LightsReplyModal = ({
  addLight,
  toggleLightsReplyModalVisibility,
  personToReceiveLight,
  receiverName,
}) => {
  const onChange = (e) => {
    const light = e.target.value;
    if (window.confirm(`Would you like to send ${light} to ${receiverName}?`)) {
      const messages = {
        red: "I love you",
        blue: "I believe in you",
        green: "Please stay healthy and safe",
        orange: "I encourage you",
      };

      addLight({
        personToReceiveLight,
        light,
        message: messages[light],
        removeLightAt: moment().add(24, "hours").toDate(),
      });
    }
  };

  return (
    <div className="lightsReplyModal">
      <h3>Reply lights here :)</h3>
      <button
        className="closeReplyModalButton"
        onClick={() => toggleLightsReplyModalVisibility(false)}
      >
        X
      </button>
      <span>To {receiverName}</span>
      <form>
        <div className="replyLights">
          <label htmlFor="red" className="red" />
          <input
            type="radio"
            name="light"
            value="red"
            id="red"
            onChange={onChange}
          />
          <label htmlFor="blue" className="blue" />
          <input
            type="radio"
            name="light"
            value="blue"
            id="blue"
            onChange={onChange}
          />
          <label htmlFor="green" className="green" />
          <input
            type="radio"
            name="light"
            value="green"
            id="green"
            onChange={onChange}
          />
          <label htmlFor="orange" className="orange" />
          <input
            type="radio"
            name="light"
            value="orange"
            id="orange"
            onChange={onChange}
          />
        </div>
      </form>
    </div>
  );
};

LightsReplyModal.propTypes = {
  addLight: PropTypes.func.isRequired,
};

export default connect(null, { addLight })(LightsReplyModal);
