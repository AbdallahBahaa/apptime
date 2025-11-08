import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './bootstrap';
// import './idle-monitor'; // Commented out to avoid conflicts with React idle monitor

console.log('React app.js loaded - about to render');

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    React.createElement(React.StrictMode, null,
        React.createElement(BrowserRouter, null,
            React.createElement(App, null)
        )
    )
);

console.log('React app rendered');
