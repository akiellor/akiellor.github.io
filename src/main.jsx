import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Blog from './blog.jsx';

$(document).ready(function() {
  ReactDOM.render(<Blog />, document.getElementById('content'));
});
