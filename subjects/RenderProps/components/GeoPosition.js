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
      <div>{this.props.children(this.state)}</div>
    )
  }
}

export default GeoPosition;