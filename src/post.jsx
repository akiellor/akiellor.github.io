import React from 'react';
import ReactDOM from 'react-dom';
import hljs from 'highlight.js';
import $ from 'jquery';

export default React.createClass({
  componentDidUpdate: function() {
    $('pre code', ReactDOM.findDOMNode(this)).each(function(i, block) {
      hljs.highlightBlock(block);
    });
  },
  render: function(){
    var html = { __html: this.props.post.content };
    return (
      <div>
        <div className="post" dangerouslySetInnerHTML={html}></div>
        <hr />
      </div>
    )
  }
})
