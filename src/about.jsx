import React from 'react';

export default React.createClass({
  render: function(){
    return (
      <section className="about">
        <p>I am Software Developer currently working for <a href="https://thoughtworks.com">ThoughtWorks</a>.</p>

        <div className="social">
          <a href="https://github.com/akiellor" className="github">Github</a>
          <a href="https://twitter.com/akiellor" className="twitter">Twitter</a>
        </div>
      </section>
    )
  }
})
