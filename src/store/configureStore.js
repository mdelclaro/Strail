import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AuthReducer from './reducers/AuthReducer';
import UIReducer from './reducers/UIReducer';
import ActivityReducer from './reducers/ActivityReducer';
import AthleteReducer from './reducers/AthleteReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  ui: UIReducer,
  activity: ActivityReducer,
  athlete: AthleteReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
