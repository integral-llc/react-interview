import React from 'react'

export default function connect(mapStateToProps) {
  return function (Component) {
    class WrappedComponent extends React.Component {
      static contextTypes = {
        store: React.PropTypes.object,
      }

      setCounterState = () => this.setState(mapStateToProps(this.context.store.getState()));

      componentWillMount() {
        this.context.store.listen(this.setCounterState)
      }

      componentWillUnmount() {
        this.context.store.removeListener(this.setCounterState)
      }

      render() {

        return (
          <Component {...this.state}/>
        )
      }
    }

    return WrappedComponent;
  }
}
