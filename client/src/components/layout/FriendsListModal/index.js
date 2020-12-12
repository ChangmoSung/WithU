import React, { Fragment } from "react";
import "./index.scss";
import PropTypes from "prop-types";

const FriendsListModal = ({ friendsList }) => {
  return (
    <Fragment>
      {friendsList && friendsList.length && (
        <div className="friendsListModal">
          <h2>Friends :)</h2>
          {friendsList.map((friend, i) => (
            <div key={i}>
              <span>Name: {friend.firstName}</span>
              <span>Email: {friend.email}</span>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

FriendsListModal.propTypes = {
  friendsList: PropTypes.array,
};

export default FriendsListModal;
