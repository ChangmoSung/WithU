import axios from "axios";
import {
  FRIENDS_LOADED,
  FRIENDS_LOADED_ERROR,
  ADD_FRIEND,
  ADD_FRIEND_ERROR,
  DELETE_FRIEND,
  DELETE_FRIEND_ERROR,
  ADD_LIGHT,
  ADD_LIGHT_ERROR,
  LIGHTS_LOADED,
  LIGHTS_LOADED_ERROR,
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

export const deleteFriend = (email) => async (dispatch) => {
  try {
    const res = await axios.delete(`/users/deleteFriend/${email}`);

    dispatch({
      type: DELETE_FRIEND,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DELETE_FRIEND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getLights = () => async (dispatch) => {
  try {
    const res = await axios.get("/users/getLights");

    dispatch({
      type: LIGHTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LIGHTS_LOADED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addLight = (lightAndPerson) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(lightAndPerson);
  try {
    const res = await axios.put("/users/addLight", body, config);

    dispatch({
      type: ADD_LIGHT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_LIGHT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
