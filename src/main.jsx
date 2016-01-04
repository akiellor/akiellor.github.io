require('highlight.js/styles/github.css');
require('./main.scss');

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Journal from './journal.jsx';
import {install} from './asciimation.js';

function getPosts() {
  return $.get('./model.json').then((model) => {
    const postPromises = model.posts.map((post) => {
      return $.ajax({
        url: `./posts/${post.id}.html`,
        dataType: 'text',
        cache: false
      }).then(function(content) {
        post.content = content;
        post.draft = $('<div>').html(content).find('meta[name="draft"]').attr('content') === 'true';
        return post;
      });
    })
    return $.when(...postPromises).then((...args) => args);
  });
}

$(document).ready(function() {
  install();
  const root = ReactDOM.render(<Journal />, document.getElementById('content'));
  getPosts().then((posts) => {
    root.setState(function(previousState) {
      previousState.posts = posts;
      return previousState;
    });
  });
  function updateAllowDrafts() {
    root.setState(function(previousState) {
      previousState.allowDrafts = window.location.hash === '#drafts';
      return previousState;
    });
  }
  updateAllowDrafts();
  setInterval(updateAllowDrafts, 50);
});
