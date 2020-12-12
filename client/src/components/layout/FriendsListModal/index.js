import React, { Fragment, useEffect } from "react";
import "./index.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFriendsList } from "../../../actions/users";

const FriendsListModal = ({ getFriendsList, friendsList }) => {
  useEffect(() => {
    getFriendsList();
  }, []);

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
  getFriendsList: PropTypes.func.isRequired,
  friendsList: PropTypes.array,
};

const mapStateToProps = (state) => ({
  friendsList: state.users.friendsList,
});

export default connect(mapStateToProps, { getFriendsList })(FriendsListModal);
