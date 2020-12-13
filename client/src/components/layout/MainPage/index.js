import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./index.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFriendsList } from "../../../actions/users";
import FriendsListModal from "../FriendsListModal/index.js";

const MainPage = ({ getFriendsList, friendsList }) => {
  const [userSocketIds, setUserSocketIds] = useState([]);
  const [userSocketId, setUserSocketId] = useState("");

  useEffect(() => {
    getFriendsList();
    const socket = io();
    socket.on("userSignedIn", (otherUsers, user) => {
      setUserSocketIds(otherUsers);
      setUserSocketId(user);
    });

    socket.emit("userSignedOut", userSocketId);
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
    console.log(person);
    console.log(light);
  };
  const onChange = (e) => {
    if (!person) {
      alert("Select a person to send a light first :)");
      return;
    }
    setLight(e.target.value);
  };

  return (
    <div className="container">
      <button
        className="toggleModal"
        onClick={() => toggleFriendsListVisibility(!friendsListVisibility)}
      ></button>
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
  getFriendsList: PropTypes.func.isRequired,
  friendsList: PropTypes.array,
};

const mapStateToProps = (state) => ({
  friendsList: state.users.friendsList,
});

export default connect(mapStateToProps, { getFriendsList })(MainPage);
