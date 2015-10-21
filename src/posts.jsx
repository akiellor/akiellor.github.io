import React from 'react';
import Post from './post.jsx';

export default React.createClass({
  render: function(){
    const posts = this.props.posts.map(function(post) {
      return (
        <Post key={post.id} post={post} />
      )
    });
    return (
      <div>
        {posts}
      </div>
    )
  }
})
