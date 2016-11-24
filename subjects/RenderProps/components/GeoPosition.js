import React from 'react'
import LoadingDots from '../utils/LoadingDots'

class GeoPosition extends React.Component {
  state = {
    coords: {
      latitude: null,
      longitude: null
    }
  };

  componentDidMount() {
    this.geoId = navigator.geolocation.watchPosition(
        (position) => {
        this.setState({
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      })

    this.props.getGeoPosition(this.state)
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
    return (
      <div>
      <h1>Geolocation</h1>
      {
        this.state.error ? (
          <div>{this.state.error.message}</div>
        ) : (
          <dl>
            <dt>Latitude</dt>
            <dd>{this.state.coords.latitude || <LoadingDots/>}</dd>
            <dt>Longitude</dt>
            <dd>{this.state.coords.longitude || <LoadingDots/>}</dd>
            {this.props.children}
          </dl>
        )
      }
      </div>
    )
  }
}

export default GeoPosition;