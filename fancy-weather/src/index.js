import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import 'normalize.css';
import './vars.scss';
require('typeface-montserrat');

ReactDOM.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
