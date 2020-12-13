import React, { Fragment, useState } from "react";
import "./index.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteFriend } from "../../../actions/users";
import AddFriendModal from "./AddFriendModal/index.js";

const FriendsListModal = ({ friendsList, deleteFriend }) => {
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
        {friendsList && (
          <Fragment>
            {friendsList.map(({ firstName, email }, i) => (
              <div key={i}>
                <span>Name: {firstName}</span>
                <span>Email: {email}</span>
                <button onClick={() => deleteFriend(email)}>X</button>
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
  deleteFriend: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  friendsList: state.users.friendsList,
});

export default connect(mapStateToProps, { deleteFriend })(FriendsListModal);
