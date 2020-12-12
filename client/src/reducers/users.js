import { FRIENDS_LOADED, FRIENDS_LOADED_ERROR } from "../actions/types";

const initialState = {
  friendsList: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FRIENDS_LOADED:
      return {
        ...state,
        friendsList: payload,
        loading: false,
      };
    case FRIENDS_LOADED_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
