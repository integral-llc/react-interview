import React from 'react'

export default function connect(mapStateToProps) {
  return function (Component) {
    class WrappedComponent extends React.Component {
      setCounterState() {
        this.state = mapStateToProps(this.context.store.getState());
      }

      componentWillMount() {
        this.context.store.listen(() => {
          this.setState(mapStateToProps(this.context.store.getState()));
        })
      }

      componentWillUnmount() {
        this.context.store.removeListener(() => {
          this.setState(mapStateToProps(this.context.store.getState()));
      })
      }

      render() {

        return (
          <Component {...this.context.store} {...this.state}/>
        )
      }
    }

    WrappedComponent.contextTypes = {
      store: React.PropTypes.object
    };

    return WrappedComponent;
  }
}
