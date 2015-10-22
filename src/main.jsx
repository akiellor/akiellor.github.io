require('./main.scss');

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Journal from './journal.jsx';

$(document).ready(function() {
  ReactDOM.render(<Journal />, document.getElementById('content'));
});
