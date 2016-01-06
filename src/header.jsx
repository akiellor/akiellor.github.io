import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render: function(){
    return (
      <section className="header">
        <h2 className="title">@akiellor</h2>

        <div className="links">
          <Link to="/">Blog</Link>
          <Link to="/about">About</Link>
        </div>
      </section>
    )
  }
})
