import { SET_ATHLETE } from '../actions/types';

const initialState = {
  name: '',
  sex: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ATHLETE:
      return {
        ...state,
        name: action.payload.name,
        sex: action.payload.sex
      };
    default:
      return state;
  }
};
