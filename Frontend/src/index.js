import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Routers/App';
import {
    BrowserRouter
} from 'react-router-dom';
import Timeline from './components/Timeline';

ReactDOM.render(( <
    BrowserRouter >
    <
    App / >
    <
    / BrowserRouter>
), document.getElementById('root'));