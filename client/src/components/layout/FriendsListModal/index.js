import React, { Fragment, useState } from "react";
import "./index.scss";
import PropTypes from "prop-types";
import AddFriendModal from "./AddFriendModal/index.js";

const FriendsListModal = ({ friendsList }) => {
  const [addFriendModalVisibility, toggleAddFriendModalVisibility] = useState(
    false
  );

  return (
    <Fragment>
      <div className="friendsListModal">
        <h2>Friends :)</h2>
        <button
          className="addFriendModalOpener"
          onClick={() =>
            toggleAddFriendModalVisibility(!addFriendModalVisibility)
          }
        >
          Add
        </button>
        {friendsList && friendsList.length && (
          <Fragment>
            {friendsList.map(({ firstName, email }, i) => (
              <div key={i}>
                <span>Name: {firstName}</span>
                <span>Email: {email}</span>
              </div>
            ))}
          </Fragment>
        )}
      </div>
      {addFriendModalVisibility && <AddFriendModal />}
    </Fragment>
  );
};

FriendsListModal.propTypes = {
  friendsList: PropTypes.array,
};

export default FriendsListModal;
