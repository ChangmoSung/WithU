import React, { Fragment, useEffect } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFriendsList, deleteFriend } from "../../../actions/users";
import AddFriendModal from "./AddFriendModal/index.js";

const FriendsListModal = ({
  getFriendsList,
  deleteFriend,
  friendsList,
  isAuthenticated,
}) => {
  useEffect(() => {
    getFriendsList();
  }, [getFriendsList]);

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <Fragment>
      <div className="friendsListModal">
        <h2>Friends List</h2>
        {friendsList && (
          <Fragment>
            {friendsList.map(({ firstName, email }, i) => (
              <div key={i}>
                <span>{firstName}</span>
                <button>Send light</button>
                <button onClick={() => deleteFriend(email)}>X</button>
                {/* <AddFriendModal /> */}
              </div>
            ))}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

FriendsListModal.propTypes = {
  getFriendsList: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func.isRequired,
  friendsList: PropTypes.array,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  friendsList: state.users.friendsList,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getFriendsList,
  deleteFriend,
})(FriendsListModal);
