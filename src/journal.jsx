import React from 'react';
import { connect } from 'react-redux';
import Header from './header.jsx';
import Posts from './posts.jsx';

function Journal({ posts, allowDrafts }) {
  posts = posts.filter((post) => {
    return allowDrafts || !post.draft;
  });
  return <div className="container"><Header /><Posts posts={posts}/></div>
}

export default connect(state => {
  return {posts: state.posts};
}, {})(Journal);
