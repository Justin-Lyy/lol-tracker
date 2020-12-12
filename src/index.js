import React from 'react';
import ReactDOM from 'react-dom';
import loadable from "@loadable/component";
// import App from './components/App.js'

const LoadableApp = loadable(() => import('./components/App.js'))

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<LoadableApp/>, wrapper) :false;