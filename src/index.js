import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import orderReducer from './components/reducers/orderReducer';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import promiseMiddleware from "redux-promise-middleware";



const store = createStore(orderReducer, applyMiddleware( promiseMiddleware ));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
