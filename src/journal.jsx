import React from 'react';
import { connect } from 'react-redux';
import Posts from './posts.jsx';

function Journal({ posts, allowDrafts }) {
  posts = posts.filter((post) => {
    return allowDrafts || !post.draft;
  });
  return <Posts posts={posts}/>
}

export default connect(state => {
  return {posts: state.posts};
}, {})(Journal);
