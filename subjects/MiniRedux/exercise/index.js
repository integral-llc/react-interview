import React from 'react'
import { render } from 'react-dom'
import createStore from './mini-redux/createStore'
import Provider from './mini-redux/Provider'
import App from './components/App'

const store = createStore((state = 0, action) => {
  if (action.type === 'INCREMENT') {
    return state + 1
  } else if (action.type === 'DECREMENT') {
    return state - 1
  } else {
    return state
  }
});

render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('app'));
