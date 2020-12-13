import {
  FRIENDS_LOADED,
  ADD_FRIEND,
  FRIENDS_LOADED_ERROR,
  ADD_FRIEND_ERROR,
} from "../actions/types";

const initialState = {
  friendsList: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FRIENDS_LOADED:
    case ADD_FRIEND:
      return {
        ...state,
        friendsList: payload,
        loading: false,
      };
    case FRIENDS_LOADED_ERROR:
    case ADD_FRIEND_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
