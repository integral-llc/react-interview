import React from 'react'

export default function connect(mapStateToProps = (state) => ({}), mapDispatchToProps = dispatch => ({dispatch})) {
  return function (Component) {

    class Connect extends React.Component {

      static contextTypes = {
        store: React.PropTypes.object
      };

      mergedProps = {};

      constructor(props, context) {
        super(props, context);

        this.state = {
          storeState: this.context.store.getState()
        };

        this.onStateChange = this.onStateChange.bind(this);
      }

      componentDidMount() {
        this.context.store.listen(this.onStateChange);
      }

      componentWillUnMount() {
        this.context.store.removeListener(this.onStateChange);
      }

      onStateChange() {
        const storeState =  this.context.store.getState();
        this.setState({storeState})
      }

      mergeProps() {
        const stateProps = mapStateToProps(this.state.storeState);
        const dispatchProps = mapDispatchToProps(this.context.store.dispatch);

        this.mergedProps = {...stateProps, ...dispatchProps, ...this.props};
      }

      render() {
        this.mergeProps();

        return <Component {...this.mergedProps} />;
      }
    }

    Connect.displayName = `Connect${Component.displayName || Component.name || 'Component'}`;

    return Connect;
  }
}
