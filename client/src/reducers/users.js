import {
  FRIENDS_LOADED,
  FRIENDS_LOADED_ERROR,
  ADD_FRIEND,
  ADD_FRIEND_ERROR,
  DELETE_FRIEND,
  DELETE_FRIEND_ERROR,
  ADD_LIGHT,
  ADD_LIGHT_ERROR,
} from "../actions/types";

const initialState = {
  friendsList: [],
  lights: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_LIGHT:
      return {
        ...state,
        lights: payload,
        loading: false,
      };
    case FRIENDS_LOADED:
    case ADD_FRIEND:
    case DELETE_FRIEND:
      return {
        ...state,
        friendsList: payload,
        loading: false,
      };
    case FRIENDS_LOADED_ERROR:
    case ADD_FRIEND_ERROR:
    case DELETE_FRIEND_ERROR:
    case ADD_LIGHT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
