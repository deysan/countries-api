import { SET_COUNTRY, SET_ERROR, SET_LOADING } from './detailsActions';

const initialState = {
  status: 'idle', // loading | received | rejected
  error: null,
  country: null,
};

export const detailsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_COUNTRY:
      return {
        ...state,
        status: 'received',
        country: payload,
      };
    case SET_LOADING:
      return {
        ...state,
        status: 'loading',
        error: null,
      };
    case SET_ERROR:
      return {
        ...state,
        status: 'rejected',
        error: payload,
      };
    default:
      return state;
  }
};
