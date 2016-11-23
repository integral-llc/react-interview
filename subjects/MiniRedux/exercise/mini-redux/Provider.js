import React from 'react'

class Provider extends React.Component {
  getChildContext() {
    return {store: this.props.store};
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
};


export default Provider
