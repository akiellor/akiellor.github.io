import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { asciimate } from './asciimation';
import { pushPath } from 'redux-simple-router';
import $ from 'jquery';

function findPost(posts, id) {
  return posts.filter((post) => post.id === id)[0];
}

const Post = React.createClass({
  componentDidUpdate: function() {
    const node = ReactDOM.findDOMNode(this);
    $('.asciimate', node).each((i, e) => {
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
        <div className="post" dangerouslySetInnerHTML={html}></div>
        <hr />
      </div>
    )
  }
});

export default connect(state => {
  return {posts: state.posts};
}, { pushPath })(Post);
