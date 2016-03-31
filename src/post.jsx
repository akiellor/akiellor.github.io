import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { asciimate } from './asciimation';
import { pushPath } from 'redux-simple-router';
import { Link } from 'react-router';

function findPost(posts, id) {
  return posts.filter((post) => post.id === id)[0];
}

const Paging = React.createClass({
  render: function() {
    const posts = this.props.posts;
    const post = this.props.current;

    const published = posts.filter((p) => !p.draft);
    const next = published[published.indexOf(post) - 1];
    const prev = published[published.indexOf(post) + 1];

    let nextLink = <div />;
    if (next) {
      nextLink = <Link to={`post/${next.id}`} params={{ id: next.id }}>{next.title}</Link>;
    }
    let prevLink = <div />;
    if (prev) {
      prevLink = <Link to={`post/${prev.id}`} params={{ id: prev.id }}>{prev.title}</Link>;
    }

    return (
      <div className="paging">
        <span className="previous">{prevLink}</span>
        <span className="next">{nextLink}</span>
      </div>
    )
  }
});

const Post = React.createClass({
  componentDidUpdate: function() {
    const node = ReactDOM.findDOMNode(this);
    Array.prototype.forEach.call(node.querySelectorAll('.asciimate'), (e) => {
      asciimate(e);
    });
  },
  componentWillUpdate: function() {
    const { posts, params, pushPath } = this.props;

    const post = findPost(posts, params.id);
    if (posts.length > 0 && !post) {
      pushPath('/');
    }
  },
  render: function() {
    const { posts, params } = this.props;

    const post = findPost(posts, params.id);
    if (!post) {
      return <div />
    }

    var html = { __html: post.content };

    return (
      <div>
        <Paging posts={posts} current={post} />
        <hr />
        <div className="post" dangerouslySetInnerHTML={html}></div>
        <hr />
        <Paging posts={posts} current={post} />
      </div>
    )
  }
});

export default connect(state => {
  return {posts: state.posts};
}, { pushPath })(Post);
