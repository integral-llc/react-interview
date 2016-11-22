import React from 'react';

import getAddressFromCoords from './utils/getAddressFromCoords'

import GeoAddress from './GeoAddress';

export default function renderGeoPosition(Component) {

  class GeoPosition extends React.Component {
    state = {
      coords: {
        latitude: null,
        longitude: null
      },
      address: null
    };

    constructor(props, context) {
      super(props, context);
    }

    componentDidMount() {
      this.geoId = navigator.geolocation.watchPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          this.setState({
            coords: {
              latitude,
              longitude
            }
          });
          getAddressFromCoords(latitude, longitude).then(address => this.setState({address}));
        },
        (error) => {
          this.setState({error})
        }
      )
    }

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.geoId)
    }

    render() {
      return (
        <div>
          <Component latitude={this.state.coords.latitude} longitude={this.state.coords.latitude} />
          <GeoAddress address={this.state.address} />
        </div>
      )
    }

  }

  GeoPosition.displayName = `GeoPosition${Component.displayName || Component.name || 'Component'}`;

  return GeoPosition;
}