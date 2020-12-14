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
    case LIGHTS_LOADED:
    case DELETE_LIGHT:
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
    case LIGHTS_LOADED_ERROR:
    case DELETE_LIGHT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
