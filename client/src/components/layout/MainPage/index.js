import React, { useState, useEffect } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFriendsList } from "../../../actions/users";
import { addLight } from "../../../actions/users";
import { signOut } from "../../../actions/auth";
import FriendsListModal from "../FriendsListModal/index.js";

const MainPage = ({
  signOut,
  isAuthenticated,
  getFriendsList,
  friendsList,
  addLight,
}) => {
  useEffect(() => {
    getFriendsList();
  }, []);

  const [light, setLight] = useState("");
  const [person, setPerson] = useState("");
  const [friendsListVisibility, toggleFriendsListVisibility] = useState(false);
  const [listVisibility, toggleListVisibility] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!person) {
      alert("Select a person to send a light first :)");
      return;
    } else if (!light) {
      alert("Select a light to send to the person :)");
      return;
    }

    addLight({ person, light });
  };
  const onChange = (e) => {
    if (!person) {
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
      ></button>
      <button className="signOut" onClick={() => signOut()}></button>
      {friendsListVisibility && <FriendsListModal friendsList={friendsList} />}
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
                    setPerson(email);
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
};

const mapStateToProps = (state) => ({
  friendsList: state.users.friendsList,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signOut, getFriendsList, addLight })(
  MainPage
);
