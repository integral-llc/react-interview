import React from 'react'

export default function connect(mapStateToProps = (state) => ({}), mapDispatchToProps = dispatch => ({dispatch})) {
  return function (Component) {

    class Connect extends React.Component {

      static contextTypes = {
        store: React.PropTypes.object
      };

      render() {
        const props = {...mapStateToProps(this.context.store.getState()), ...mapDispatchToProps(this.context.store.dispatch)};

        return <Component {...props} />;
      }
    }

    Connect.displayName = `Connect${Component.displayName || Component.name || 'Component'}`;

    return Connect;
  }
}
