require('highlight.js/styles/github.css');
require('./main.scss');

import $ from 'jquery';
import Journal from './journal.jsx';
import { install } from './asciimation.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route } from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import { syncReduxAndRouter, routeReducer, pushPath } from 'redux-simple-router';

function postsReducer(state = [], action) {
  if (action.type === 'INITIALISE') {
    state = action.posts;
  }
  return state;
};

const reducer = combineReducers(Object.assign({}, {
  routing: routeReducer,
  posts: postsReducer
}));
const store = createStore(reducer);
const history = createHistory();

syncReduxAndRouter(history, store);

const DraftJournal = React.createClass({
  render: function() {
    return <Journal allowDrafts={true} />
  }
});

const App = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
});

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
  ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Journal} />
          <Route path="drafts" component={DraftJournal} />
        </Route>
      </Router>
    </Provider>
  ), document.getElementById('content'));

  getPosts().then((posts) => {
    store.dispatch({type: 'INITIALISE', posts: posts});
  });
});
