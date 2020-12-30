import axios from "axios";
import { setAlert } from "./alerts";
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
  DELETE_LIGHT,
  DELETE_LIGHT_ERROR,
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

export const addFriend = (friendInfo = {}) => async (dispatch) => {
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
    dispatch(setAlert({ msg: "Friend added", alertType: "success" }));
  } catch (err) {
    dispatch({
      type: ADD_FRIEND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert({ msg: "Friend not added", alertType: "danger" }));
  }
};

export const deleteFriend = (email = "") => async (dispatch) => {
  try {
    const res = await axios.delete(`/users/deleteFriend/${email}`);

    dispatch({
      type: DELETE_FRIEND,
      payload: res.data,
    });
    dispatch(setAlert({ msg: "Friend deleted", alertType: "success" }));
  } catch (err) {
    dispatch({
      type: DELETE_FRIEND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert({ msg: "Friend not deleted", alertType: "danger" }));
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

export const sendLight = (lightAndPerson = {}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(lightAndPerson);
  try {
    const res = await axios.put("/users/sendLight", body, config);

    dispatch({
      type: ADD_LIGHT,
      payload: res.data,
    });
    dispatch(setAlert({ msg: "Light sent", alertType: "success" }));
  } catch (err) {
    dispatch({
      type: ADD_LIGHT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert({ msg: "Light not sent", alertType: "danger" }));
  }
};

export const deleteLight = (emailOfPersonToDeleteLightFrom = "") => async (
  dispatch
) => {
  try {
    const res = await axios.delete(
      `/users/deleteLight/${emailOfPersonToDeleteLightFrom}`
    );

    dispatch({
      type: DELETE_LIGHT,
      payload: res.data,
    });
    dispatch(setAlert({ msg: "Light deleted", alertType: "success" }));
  } catch (err) {
    dispatch({
      type: DELETE_LIGHT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert({ msg: "Light not deleted", alertType: "danger" }));
  }
};
