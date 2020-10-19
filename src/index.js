import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import orderReducer from './components/reducers/orderReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(orderReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
