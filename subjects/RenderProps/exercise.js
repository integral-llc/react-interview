////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Refactor App by creating a new component named `<GeoPosition>`
// - <GeoPosition> should use a child render callback that passes
//   to <App> the latitude and longitude state
// - When you're done, <App> should no longer have anything but
//   a render method
// - now create a <GeoAddress> component that also uses a render
//   callback with the current address. You will use
//   `getAddressFromCoords(latitude, longitude)` to get the
//   address, it returns a promise.
// - You should be able to compose <GeoPosition> and <GeoAddress>
//   beneath it to naturally compose both the UI and the state
//   needed to render it
// - Make sure GeoAddress supports the user moving positions
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import LoadingDots from './utils/LoadingDots'
import getAddressFromCoords from './utils/getAddressFromCoords'

//@INFO FOR THE SAKE OF TIME, COMPONENTS ARE NOT IN SEPARATE FILES
class GeoAddress extends React.Component {
  static propTypes = {
    latitude: React.PropTypes.number,
    longitude: React.PropTypes.number
  };

  state = {
    address: null
  };

  componentDidMount() {
    const {latitude, longitude} = this.props;
    this.fetchAddress(latitude, longitude);
  }

  fetchAddress(latitude, longitude) {
    latitude && longitude && getAddressFromCoords(latitude, longitude).then(
      (address) => this.setState({ address })
    )
  }

  componentDidUpdate(prevProps) {
    const { latitude, longitude } = this.props;
    const { latitude: latitudePrev } = prevProps;
    (latitudePrev !== latitude) && this.fetchAddress(latitude, longitude);
  }

  render() {
    return this.props.children(this.state)
  }
}

class GeoPosition extends React.Component {
  state = {
    coords: {
      latitude: null,
      longitude: null
    },
  };

  componentDidMount() {
    this.geoId = navigator.geolocation.watchPosition(
      ({coords: {latitude, longitude}}) => {
        this.setState({
          coords: {
            latitude,
            longitude
          }
        });
      },
      (error) => {
        this.setState({ error })
      }
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId)
  }

  render() {
    return <div>{this.props.children(this.state)}</div>
  }
}


class App extends React.Component {

  render() {
    return (
      <div>
        <h1>Geolocation</h1>
        <GeoPosition>
          {({error, coords}) =>
            error ? (
            <div>{error.message}</div>
          ) : (
            <dl>
              <dt>Latitude</dt>
              <dd>{coords.latitude || <LoadingDots/>}</dd>
              <dt>Longitude</dt>
              <dd>{coords.longitude || <LoadingDots/>}</dd>
            </dl>
          )}
        </GeoPosition>
        <h1>GeoAddress</h1>
        <GeoPosition>
          {({ coords }) => (
            <GeoAddress
              latitude={coords.latitude}
              longitude={coords.longitude}
            >
              {({ address }) => (
                <p>{address || <LoadingDots/>}</p>
              )}
            </GeoAddress>
          )}
        </GeoPosition>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'));
