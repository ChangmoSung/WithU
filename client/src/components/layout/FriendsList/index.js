import React, { Fragment, useState, useEffect } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFriendsList, deleteFriend } from "../../../actions/users";
import SendLightModal from "../SendLightModal/index.js";
import AddFriendModal from "./AddFriendModal/index.js";

const FriendsList = ({
  getFriendsList,
  deleteFriend,
  friendsList,
  isAuthenticated,
}) => {
  const [isAddFriendModalVisible, toggleIsAddFriendModalVisible] = useState(
    false
  );
  const [isSendLightModalVisible, toggleIsSendLightModalVisible] = useState(
    false
  );
  const [receiverInfo, setReceiverInfo] = useState({
    personToReceiveLight: "",
    receiverName: "",
  });

  useEffect(() => {
    getFriendsList();
  }, [getFriendsList]);

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <Fragment>
      <div className="container">
        <div className="wrapper friendsList">
          <h2>Friends List</h2>
          <button
            className="openAddFriendsModalButton"
            onClick={() => toggleIsAddFriendModalVisible(true)}
          >
            Add friends
          </button>
          {friendsList.length
            ? friendsList.map(({ firstName, lastName, email }, i) => (
                <div key={i} className="individualFriend">
                  <span>{firstName}</span>
                  <div className="buttonsContainer">
                    <button
                      onClick={() => {
                        setReceiverInfo({
                          personToReceiveLight: email,
                          receiverName: `${firstName} ${lastName}`,
                        });
                        toggleIsSendLightModalVisible(true);
                      }}
                    >
                      Send light
                    </button>
                    <button
                      onClick={() =>
                        window.confirm(
                          "Would you like to unfriend this user?"
                        ) && deleteFriend(email)
                      }
                    >
                      X
                    </button>
                  </div>
                </div>
              ))
            : null}
          {isAddFriendModalVisible && (
            <AddFriendModal
              toggleIsAddFriendModalVisible={toggleIsAddFriendModalVisible}
            />
          )}
          {isSendLightModalVisible && (
            <SendLightModal
              toggleIsSendLightModalVisible={toggleIsSendLightModalVisible}
              receiverInfo={receiverInfo}
            />
          )}
          {!friendsList.length && (
            <p>Add friends to show how you feel about them :)</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

FriendsList.propTypes = {
  getFriendsList: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func.isRequired,
  friendsList: PropTypes.array,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  friendsList: state.users.friendsList,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getFriendsList,
  deleteFriend,
})(FriendsList);
