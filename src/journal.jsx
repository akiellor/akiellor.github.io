import React from 'react';
import $ from 'jquery';
import Header from './header.jsx';
import Posts from './posts.jsx';
import model from './model.json';

function getPosts() {
  return $.get('./model.json').then((model) => {
    const postPromises = model.posts.map((post) => {
      return $.ajax({
        url: `./posts/${post.id}.html`,
        dataType: 'text',
        cache: false
      }).then(function(content) {
        post.content = content;
        return post;
      });
    })
    return $.when(...postPromises).then((...args) => args);
  });
}
export default React.createClass({
  getInitialState: function() {
    var allowDrafts = window.location.hash === "#drafts";
    return {
      posts: []
    }
  },
  componentDidMount: function() {
    getPosts().then((posts) => this.setState({posts: posts}));
  },
  render: function(){
    return <div className="container"><Header /><Posts posts={this.state.posts}/></div>
  }
})
