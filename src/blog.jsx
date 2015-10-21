import React from 'react';
import $ from 'jquery';
import Header from './header.jsx';
import Posts from './posts.jsx';
import model from './model.json';

export default React.createClass({
  getInitialState: function() {
    return model;
  },
  componentDidMount: function() {
    var self = this;
    this.state.posts.forEach((post) => {
      $.ajax({
        url: `./posts/${post.id}.html`,
        dataType: 'text',
        cache: false,
        success: (data) => {
          post.content = data;
          self.setState(self.state);
        },
        error: (xhr, status, err) => {
          console.error(status, err.toString());
        }
      });
    });
  },
  render: function(){
    return <div><Header /><Posts posts={this.state.posts}/></div>
  }
})
