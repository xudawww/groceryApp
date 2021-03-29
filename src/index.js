import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import Landing from './component/Landing';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware,combineReducers} from 'redux';
import todosReducer from './reducers/rootReducer'
import sellerReducer from './reducers/sellerReducer'
import { Auth0Provider } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import thunk from 'redux-thunk';
const store = createStore(
  combineReducers({
    todosReducer:todosReducer,
    sellerReducer:sellerReducer
  }), 
applyMiddleware(thunk));

console.log(store.getState().todosReducer)
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Auth0Provider
        domain="library123.auth0.com"
        clientId="IMGqmrKqpxLeWj8WYyjj8lhxsh4DecPw"
        redirectUri={window.location.origin}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
          <Landing/> 
      </Auth0Provider> 
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
