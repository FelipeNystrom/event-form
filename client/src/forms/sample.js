import React, { Component } from 'react';
import './sample.css';

class Sample extends Component {
  render() {
    const { name, handleClick, selected } = this.props;
    return (
      <div
        onClick={handleClick}
        className={selected ? 'sample-wrapper selected' : 'sample-wrapper'}
      >
        <img name={name} src="https://via.placeholder.com/170" alt="#" />
      </div>
    );
  }
}

export default Sample;
