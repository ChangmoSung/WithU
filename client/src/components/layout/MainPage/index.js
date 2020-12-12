import React, { useState, useRef } from "react";
import "./index.scss";
import FriendsListModal from "../FriendsListModal/index.js";

const MainPage = () => {
  const [light, setLight] = useState("");
  const [person, setPerson] = useState("");
  const [friendsListVisibility, toggleFriendsListVisibility] = useState(false);
  const inputEl = useRef("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!light) {
      alert("Select a light to send to the person :)");
      return;
    }
    console.log(light);
    console.log(person);
  };
  const onChange = (e) => {
    if (!person) {
      alert("Select a person to send a light first :)");
      return;
    }
    setLight(e.target.value);
  };
  const onClick = (e) => setPerson(inputEl.current.value);

  return (
    <div className="container">
      <span
        className="toggleModal"
        onClick={() => toggleFriendsListVisibility(!friendsListVisibility)}
      ></span>
      {friendsListVisibility && <FriendsListModal />}
      <div className="wrapper mainPage">
        <h2>Show your emotions :)</h2>
        <div className="findPerson">
          <input
            type="text"
            className="personName"
            ref={inputEl}
            placeholder="Enter the person name"
          />
          <button onClick={onClick}>Find</button>
        </div>
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
          </div>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default MainPage;
