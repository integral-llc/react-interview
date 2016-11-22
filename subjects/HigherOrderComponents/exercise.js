////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMousePosition` a "higher-order component" that sends the mouse
// position to the component as props.
//
// hint: use `event.clientX` and `event.clientY`

import React from 'react'
import {render} from 'react-dom'

const withMousePosition = (Component) => {

  class MousePosition extends React.Component {
    state = {
      x: 0,
      y: 0
    };

    constructor(props, context) {
      super(props, context);

      this.onMouseMove = this.onMouseMove.bind(this);
    }

    onMouseMove({clientX: x, clientY: y}) {
      this.setState({x, y});
    }


    componentDidMount() {
      document.addEventListener('mousemove', this.onMouseMove);
    }

    componentWillUnmount() {
      document.removeEventListener('mousemove', this.onMouseMove);
    }

    render() {

      return <Component mouse={this.state} />;
    }
  }

  MousePosition.displayName = `MousePosition${Component.displayName || Component.name || 'Component'}`;

  return MousePosition;
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

