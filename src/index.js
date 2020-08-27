import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js'

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<App />, wrapper) :false;