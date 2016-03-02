import React from 'react';
import { Link } from 'react-router';

function tagAsColor(title) {
  const colors = [
    'blue',
    'green',
    'orange'
  ];

  const index = title.split('')
       .map((c) => c.charCodeAt(0))
       .reduce((m, i) => m + i ) % colors.length;

  return colors[index];
}

const Tag = React.createClass({
  render: function() {
    const title = this.props.title;
    var className = `tag ${tagAsColor(title)}`;
    return (<span className={className}>{title}</span>);
  }
});

export default React.createClass({
  render: function(){
    const posts = this.props.posts.map(function(post) {
      const tags = post.tags.map(function(t) {
        return <Tag key={t} title={t} />;
      });
      return (
        <div key={post.id}>
          <h1 className="title"><Link to={`post/${post.id}`} params={{ id: post.id }}>{post.title}</Link></h1>
          <p>{post.synopsis}</p>
          {tags}
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
