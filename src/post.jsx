import React from 'react';

export default React.createClass({
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
