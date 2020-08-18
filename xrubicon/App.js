import 'react-native-gesture-handler';
import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigations/app.navigator';

const initialState = {
  action: "",
  data: "",
  token: "",
}

const reducer = ( state = initialState, action) => {
  switch(action.type) {
    case "USER_DATA":
      return { data: action.data };
      case "SESSION":
        return { token: action.token }
    default:
      return state;
  }
}

const store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <AppNavigator />
      </Provider>
    )
  }
}