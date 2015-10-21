import React from 'react';

export default React.createClass({
  render: function(){
    var html = { __html: this.props.post.content };
    return (
      <span dangerouslySetInnerHTML={html}></span>
    )
  }
})
