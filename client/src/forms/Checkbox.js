import React, { Component } from 'react';

class Checkbox extends Component {
  constructor() {
    super();
    this.state = { isChecked: false, name: '' };
    this.handleChecked = this.handleChecked.bind(this); // set this, because you need get methods from CheckBox
  }

  componentDidMount() {
    const { nameOfBox } = this.props;

    if (nameOfBox === 'newsletter') {
      this.setState({ name: nameOfBox, isChecked: true });
    } else {
      this.setState({ name: nameOfBox });
    }
  }

  handleChecked() {
    const { changeParentState } = this.props;
    const { name, isChecked } = this.state;
    console.log(isChecked);
    if (name !== 'dontKnow' || 'noBut' || 'no' || 'yes') {
      this.setState({ isChecked: !this.state.isChecked }, () => {
        changeParentState(name, isChecked);
      });
    } else {
      changeParentState(name, isChecked);
    }
  }

  render() {
    const { name, isChecked } = this.state;

    return (
      <input
        name={name}
        checked={isChecked}
        type="checkbox"
        onChange={this.handleChecked}
      />
    );
  }
}

export default Checkbox;
