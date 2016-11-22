import React, {PropTypes} from 'react'

class Provider extends React.Component {

  static childContextTypes = {
    store: PropTypes.object
  };

  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

export default Provider
