require('highlight.js/styles/github.css');
require('./main.scss');

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Journal from './journal.jsx';
import {install} from './asciimation.js';

$(document).ready(function() {
  install();
  ReactDOM.render(<Journal />, document.getElementById('content'));
});
