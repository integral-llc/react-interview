import React from 'react'

export default function withMousePosition(Component) {

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
