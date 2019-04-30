import { SET_ACTIVITY } from '../actions/types';

const initialState = {
  name: '',
  polyline: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVITY:
      return {
        ...state,
        name: action.payload.name,
        polyline: action.payload.polyline
      };
    default:
      return state;
  }
};
