////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMousePosition`a a "higher-order component" that sends the mouse
// position to the component as props.
//
// hint: use `event.clientX` and `event.clientY`

import React from 'react'
import { render } from 'react-dom'

const withMousePosition = (Component) => {
  return class HOC extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        mouse: {
          x: 0,
          y: 0,
        }
      }
    }

    _onMouseMoveHandler(e) {
      this.setState({
        mouse: {
          x: e.clientX,
          y: e.clientY,
        }
      })
    }

    onMouseMoveHandler = e => this._onMouseMoveHandler(e);

    componentDidMount() {
      document.addEventListener('mousemove', this.onMouseMoveHandler)
    }

    componentWillUnmount() {
      document.removeEventListener('mousemove', this.onMouseMoveHandler)
    }

    render() {
      const newProps = {
        mouse: {
          x: this.state.mouse.x,
          y: this.state.mouse.y,
        }
      }

      return <Component {...newProps}/>
    }
  }
};

class App extends React.Component {

  static propTypes = {
    mouse: React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired
    }).isRequired
  };

  render() {
    return (
      <div>
        <h1>With the mouse!</h1>
        <pre>{JSON.stringify(this.props.mouse, null, 2)}</pre>
      </div>
    )
  }
}

const AppWithMouse = withMousePosition(App);

render(<AppWithMouse/>, document.getElementById('app'));

