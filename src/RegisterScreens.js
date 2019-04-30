import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import Auth from './screens/Auth';
import Home from './screens/Home';
import Activity from './screens/Activity';

import createStore from './store/configureStore';

const store = createStore();

const registerScreens = () => {
  Navigation.registerComponentWithRedux('app.Auth', () => Auth, Provider, store);
  Navigation.registerComponentWithRedux('app.Home', () => Home, Provider, store);
  Navigation.registerComponentWithRedux('app.Activity', () => Activity, Provider, store);  
};

export default registerScreens;