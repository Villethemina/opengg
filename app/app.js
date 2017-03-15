import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import Root from './components/root';
import reducer from './reducers';

const store = createStore(reducer, undefined, autoRehydrate());
persistStore(store, { storage: AsyncStorage });

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
