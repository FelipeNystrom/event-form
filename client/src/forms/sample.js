import React, { Component } from 'react';
import './sample.scss';

class Sample extends Component {
  render() {
    const { name, handleClick, selected, src } = this.props;
    return (
      <div
        onClick={handleClick}
        className={selected ? 'sample-wrapper selected' : 'sample-wrapper'}
      >
        <img name={name} src={src} alt="#" />
      </div>
    );
  }
}

export default Sample;
