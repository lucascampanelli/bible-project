import React from 'react';
import Header from './views/components/Header';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);