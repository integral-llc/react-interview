////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMousePosition`a a "higher-order component" that sends the mouse
// position to the component as props.
//
// hint: use `event.clientX` and `event.clientY`

import React from 'react'
import { render } from 'react-dom'

//@INFO FOR THE SAKE OF TIME, COMPONENTS ARE NOT IN SEPARATE FILES
const withMousePosition = (Component) => {

  Component.displayName = `WithMousePosition${Component.displayName || Component.name || 'Component'}`;

  function onMouseMove({clientX: x, clientY: y}) {
    this.setState({x, y});
  }

  return class extends React.Component {

    state = {
      x: 0, y: 0
    };

    constructor(props) {
      super(props);
      onMouseMove = this::onMouseMove;
    }

    componentWillMount() {
      document.addEventListener('mousemove', onMouseMove);
    }

    componentWillUnmount() {
      document.removeEventListener('mousemove', onMouseMove);
    }

    render() {
      const {x, y} = this.state;
      return <Component mouse={{x, y}}/>
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

