require('highlight.js/styles/github.css');
require('./main.scss');
require('whatwg-fetch');

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

function query(selector) {
  return function(node) {
    return Array.prototype.slice.call(node.querySelectorAll(selector));
  }
}

function pipeline(...fns) {
  return function(arg) {
    return fns.reduce(function(memo, fn) {
      return fn(memo);
    }, arg);
  };
}

const prop = (name) => (object) => object && object[name];

const nth = prop;

const published = pipeline(
  query('meta[name="published"]'),
  nth(0),
  prop('attributes'),
  prop('content'),
  prop('value'),
);

const mapWith = (fn) => (arr) => arr.map(fn);

const filterWith = (fn) => (arr) => arr.filter(fn);

const tags = pipeline(
  query('meta[name="tags"]'),
  nth(0),
  prop('attributes'),
  prop('content'),
  prop('value'),
  (str) => str ? str.split(',') : [],
  mapWith(s => s.trim()),
  filterWith(s => s.length !== 0)
);

const title = pipeline(
  query('h1'),
  nth(0),
  prop('textContent')
)

const synopsis = pipeline(
  query('p'),
  nth(0),
  prop('textContent')
)

function getPosts() {
  return fetch('./model.json').then(r => r.json()).then((model) => {
    const postPromises = model.posts.map((post) => {
      return fetch(`./posts/${post.id}.html`).then(r => r.text()).then(function(content) {
        post.content = content;
        const node = document.createElement('div');
        node.innerHTML = content;
        post.published = published(node);
        post.draft = !post.published;
        post.tags = tags(node);
        post.title = title(node);
        post.synopsis = synopsis(node);
        return post;
      });
    })
    return Promise.all(postPromises).then((posts) => {
      posts.sort(function (a, b) {
        if (a.published === b.published) {
          return 0;
        }
        if (b.published === undefined || a.published > b.published) {
          return 1;
        }
        if (a.published === undefined || a.published < b.published) {
          return -1;
        }
        return 0;
      });
      return posts.reverse();
    });
  });
}

getPosts().then((posts) => {
  store.dispatch({type: 'INITIALISE', posts: posts});
});
