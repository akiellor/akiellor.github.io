import React from 'react';
import { Link } from 'react-router';
import Post from './post.jsx';

export default React.createClass({
  render: function(){
    const posts = this.props.posts.map(function(post) {
      return (
        <div key={post.id}>
          <Link to={`post/${post.id}`} params={{ id: post.id }}><h3>{post.title}</h3></Link>
          <p>{post.synopsis}</p>
        </div>
      )
    });
    return (
      <div>
        {posts}
      </div>
    )
  }
})
