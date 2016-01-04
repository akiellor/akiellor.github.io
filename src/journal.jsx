import React from 'react';
import $ from 'jquery';
import Header from './header.jsx';
import Posts from './posts.jsx';

const state = {
  posts: [],
  allowDrafts: window.location.hash === "#drafts"
};

export default React.createClass({
  getInitialState: function() {
    return state;
  },
  render: function(){
    const posts = this.state.posts
      .filter((post) => {
        return this.state.allowDrafts || !post.draft;
      });
    return <div className="container"><Header /><Posts posts={posts}/></div>
  }
})
