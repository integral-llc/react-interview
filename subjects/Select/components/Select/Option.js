import React, {PropTypes} from 'react'

export default class Option extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onSelect({
      value: this.props.value,
      label: this.props.children
    });
  }

  render() {

    return (
      <div className="option" onClick={this.onClick}>
        {this.props.children}
      </div>
    );
  }
}