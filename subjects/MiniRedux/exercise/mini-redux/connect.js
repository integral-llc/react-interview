import React from 'react'

export default function connect(mapStateToProps, mapDispatchToProps) {

  return function (Component) {
    Component.displayName = `Connect${Component.displayName || Component.name || 'Component'}`;
    let mergedProps = {};
    let store;

    class Connect extends React.Component {

      static contextTypes = {
        store: React.PropTypes.any.isRequired
      };

      constructor(props, context) {
        super(props, context);
        store = context.store;
        !mapDispatchToProps && (mergedProps.dispatch = store.dispatch);
        this.state = {storeState: store.getState()};
        this.onStoreChange = ::this.onStoreChange;
      }

      componentWillMount() {
        this.mergeProps();
        store.listen(this.onStoreChange);
      }

      componentWillUnmount() {
        store.removeListener(this.onStoreChange)
      }

      onStoreChange() {
        this.setState({storeState: store.getState()});
        this.mergeProps();
      }

      mergeProps() {
        mergedProps = Object.assign({}, mergedProps, mapStateToProps(store.getState(), this.props), this.props);
      }

      render() {
        return React.createElement(Component, {...mergedProps});
      }
    }

    return Connect;
  }
}
