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
import {render} from 'react-dom'
import LoadingDots from './utils/LoadingDots'

import renderGeoPosition from './renderGeoPosition'

const App = ({latitude, longitude}) => {

    return (
        <div>
            <h1>Geolocation</h1>
            <dl>
                <dt>Latitude</dt>
                <dd>{latitude || <LoadingDots />}</dd>
                <dt>Longitude</dt>
                <dd>{longitude || <LoadingDots />}</dd>
            </dl>
        </div>
    );
};

const GeoPosition = renderGeoPosition(App);

render(<GeoPosition />, document.getElementById('app'));
