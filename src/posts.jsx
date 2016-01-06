import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render: function(){
    const posts = this.props.posts.map(function(post) {
      return (
        <div key={post.id}>
          <h1 className="title"><Link to={`post/${post.id}`} params={{ id: post.id }}>{post.title}</Link></h1>
          <p>{post.synopsis}</p>
        </div>
      )
    });
    return (
      <section className="posts">
        {posts}
      </section>
    )
  }
})
