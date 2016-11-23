import React from 'react'

class Provider extends React.Component {

  static propTypes = {
    store: React.PropTypes.any.isRequired
  };

  static childContextTypes = {
    store: React.PropTypes.any.isRequired
  };

  getChildContext() {
    return {
      store: this.props.store
    }
  }

  render() {
    return <div>{React.Children.only(this.props.children)}</div>
  }
}

export default Provider
