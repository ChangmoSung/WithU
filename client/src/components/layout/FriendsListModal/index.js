import React, { Fragment, useState, useEffect } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFriendsList, deleteFriend } from "../../../actions/users";
import LightsReplyModal from "../LightsReplyModal/index.js";
// import AddFriendModal from "./AddFriendModal/index.js";

const FriendsListModal = ({
  getFriendsList,
  deleteFriend,
  friendsList,
  isAuthenticated,
}) => {
  const [isLightsReplyModalVisible, toggleIsLightsReplyModalVisible] = useState(
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
      <div className="friendsListModal">
        <h2>Friends List</h2>
        {friendsList && (
          <Fragment>
            {friendsList.map(({ firstName, lastName, email }, i) => (
              <div key={i}>
                <span>{firstName}</span>
                <button
                  onClick={() => {
                    setReceiverInfo({
                      personToReceiveLight: email,
                      receiverName: `${firstName} ${lastName}`,
                    });
                    toggleIsLightsReplyModalVisible(true);
                  }}
                >
                  Send light
                </button>
                <button onClick={() => deleteFriend(email)}>X</button>
                {/* <AddFriendModal /> */}
              </div>
            ))}
            {isLightsReplyModalVisible && (
              <LightsReplyModal
                toggleIsLightsReplyModalVisible={
                  toggleIsLightsReplyModalVisible
                }
                receiverInfo={receiverInfo}
              />
            )}
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
