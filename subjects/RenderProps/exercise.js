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
import GeoPosition from './components/GeoPosition'
import GeoAddress from './components/GeoAddress'

class App extends React.Component {
  render() {
    return (
      <GeoPosition getGeoPosition={(state) => this.setState(state)}>
        <GeoAddress {...this.state}/>
      </GeoPosition>
    )
  }
}

render(<App/>, document.getElementById('app'));
