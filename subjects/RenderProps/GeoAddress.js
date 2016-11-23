import React from 'react';

import getAddressFromCoords from './utils/getAddressFromCoords'

export default class GeoAddress extends React.Component {

  state = {
    address: null
  };

  componentWillReceiveProps({latitude, longitude}) {
    getAddressFromCoords(latitude, longitude).then(address => this.setState({address}));
  }

  render() {
    return this.props.children(this.state.address);
  }
}
