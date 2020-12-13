import React, { useState } from "react";
import "./index.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addFriend } from "../../../../actions/users";

const AddFriendModal = ({ addFriend }) => {
  const [friendEmail, setFriendEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addFriend({ email: friendEmail, sinceWhen: new Date() });
  };

  return (
    <div className="addFriendModal">
      <h3>Add friends here :)</h3>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          onChange={(e) => setFriendEmail(e.target.value)}
          placeholder="Search by email"
          aria-label="Search by email"
        />
        <button>Ask</button>
      </form>
    </div>
  );
};

AddFriendModal.propTypes = {
  addFriend: PropTypes.func.isRequired,
};

export default connect(null, { addFriend })(AddFriendModal);
