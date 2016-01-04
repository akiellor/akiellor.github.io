import React from 'react';
import $ from 'jquery';
import Header from './header.jsx';
import Posts from './posts.jsx';

export default React.createClass({
  getInitialState: function() {
    return {
      posts: [],
      allowDrafts: false
    }
  },
  render: function(){
    const posts = this.state.posts
      .filter((post) => {
        return this.state.allowDrafts || !post.draft;
      });
    return <div className="container"><Header /><Posts posts={posts}/></div>
  }
})
