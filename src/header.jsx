import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render: function(){
    return (
      <section className="header">
        <h2 className="title"><Link to="/">&gt; blog</Link></h2>
      </section>
    )
  }
})
