import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { asciimate } from './asciimation';
import $ from 'jquery';

const Post = React.createClass({
  componentDidUpdate: function() {
    const node = ReactDOM.findDOMNode(this);
    $('.asciimate', node).each((i, e) => {
      asciimate(e);
    });
  },
  render: function() {
    const { posts, params } = this.props;
    const post = posts.filter((post) => post.id === params.id)[0];
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
}, {})(Post);
