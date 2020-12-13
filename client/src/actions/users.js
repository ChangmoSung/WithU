import axios from "axios";
import {
  FRIENDS_LOADED,
  ADD_FRIEND,
  FRIENDS_LOADED_ERROR,
  ADD_FRIEND_ERROR,
} from "./types.js";

export const getFriendsList = () => async (dispatch) => {
  try {
    const res = await axios.get("/users/getFriendsList");

    dispatch({
      type: FRIENDS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FRIENDS_LOADED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addFriend = (friendInfo) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(friendInfo);
  try {
    const res = await axios.put("/users/addFriend", body, config);

    dispatch({
      type: ADD_FRIEND,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_FRIEND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
