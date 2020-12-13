import React, { useState, useEffect } from "react";
import "./index.scss";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFriendsList, addLight, getLights } from "../../../actions/users";
import { signOut } from "../../../actions/auth";
import FriendsListModal from "../FriendsListModal/index.js";
import LightsListModal from "../LightsListModal/index.js";

const MainPage = ({
  signOut,
  isAuthenticated,
  getFriendsList,
  friendsList,
  addLight,
  getLights,
}) => {
  useEffect(() => {
    getFriendsList();
    getLights();
  }, [getFriendsList, getLights]);

  const [light, setLight] = useState("");
  const [personToReceiveLight, setPersonToReceiveLight] = useState("");
  const [friendsListVisibility, toggleFriendsListVisibility] = useState(false);
  const [listVisibility, toggleListVisibility] = useState(false);
  const [lightsListVisibility, toggleLightsListVisibility] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!personToReceiveLight) {
      alert("Select a person to send a light first :)");
      return;
    } else if (!light) {
      alert("Select a light to send to the person :)");
      return;
    }

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
  };
  const onChange = (e) => {
    if (!personToReceiveLight) {
      alert("Select a person to send a light first :)");
      return;
    }
    setLight(e.target.value);
  };

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="container">
      <button
        className="toggleModal"
        onClick={() => toggleFriendsListVisibility(!friendsListVisibility)}
      >
        Friends list
      </button>
      <button className="signOut" onClick={() => signOut()}>
        Sign out
      </button>
      <button
        className="showLights"
        onClick={() => toggleLightsListVisibility(!lightsListVisibility)}
      >
        Show lights
      </button>
      {friendsListVisibility && <FriendsListModal />}
      {lightsListVisibility && <LightsListModal />}
      <div className="wrapper mainPage">
        <h2>Show your emotions :)</h2>
        <ul>
          <li onClick={() => toggleListVisibility(!listVisibility)}>
            Select a friend :)
          </li>
          <div className={listVisibility ? "friends" : ""}>
            {listVisibility &&
              friendsList.map(({ email, firstName }, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setPersonToReceiveLight(email);
                    toggleListVisibility(!listVisibility);
                  }}
                >
                  {firstName}
                </li>
              ))}
          </div>
        </ul>
        <form onSubmit={onSubmit}>
          <div>
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
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

MainPage.propTypes = {
  signOut: PropTypes.func.isRequired,
  getFriendsList: PropTypes.func.isRequired,
  friendsList: PropTypes.array,
  isAuthenticated: PropTypes.bool.isRequired,
  addLight: PropTypes.func.isRequired,
  getLights: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  friendsList: state.users.friendsList,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  signOut,
  getFriendsList,
  addLight,
  getLights,
})(MainPage);
