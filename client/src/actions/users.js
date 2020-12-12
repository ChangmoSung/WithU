import axios from "axios";
import { FRIENDS_LOADED, FRIENDS_LOADED_ERROR } from "./types.js";

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
