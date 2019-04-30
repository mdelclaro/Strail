import { AsyncStorage } from 'react-native';
import { SET_ATHLETE } from './types';

export const storeAthlete = (name, sex) => {
  return dispatch => {
    AsyncStorage.setItem('app:athlete:name', name);
    AsyncStorage.setItem('app:athlete:sex', sex);
    dispatch(setAthlete(name, sex));
  };
};

export const setAthlete = (name, sex) => {
  return {
    type: SET_ATHLETE,
    payload: {
      name,
      sex
    }
  };
};

export const retrieveAthlete = () => {
  return dispatch => {
    Promise.all([
      AsyncStorage.getItem('app:athlete:name'),
      AsyncStorage.getItem('app:athlete:sex')
    ])
      .then(values => {
        dispatch(setAthlete(values[0], values[1]));
      })
      .catch(err => console.log(err));
  };
};
