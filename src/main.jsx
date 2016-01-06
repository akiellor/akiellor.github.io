require('highlight.js/styles/github.css');
require('./main.scss');

import $ from 'jquery';
import Journal from './journal.jsx';
import About from './about.jsx';
import Header from './header.jsx';
import Post from './post.jsx';
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
      <div className="container">
        <Header />
        {this.props.children}
      </div>
    )
  }
});

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Journal} />
        <Route path="drafts" component={DraftJournal} />
        <Route path="post/:id" component={Post} />
        <Route path="about" component={About} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('content'));

function getPosts() {
  return $.get('./model.json').then((model) => {
    const postPromises = model.posts.map((post) => {
      return $.ajax({
        url: `./posts/${post.id}.html`,
        dataType: 'text',
        cache: false
      }).then(function(content) {
        post.content = content;
        const node = $('<div>').html(content);
        post.draft = node.find('meta[name="draft"]').attr('content') === 'true';
        post.title = node.find('h1').text();
        post.synopsis = node.find('p:first').text();
        return post;
      });
    })
    return $.when(...postPromises).then((...args) => args);
  });
}

getPosts().then((posts) => {
  store.dispatch({type: 'INITIALISE', posts: posts});
});
