import React from 'react';

export default class GeoPosition extends React.Component {
  state = {
    coords: {
      latitude: null,
      longitude: null
    }
  };

  componentDidMount() {
    this.geoId = navigator.geolocation.watchPosition(
      ({coords}) => this.setState({coords}),
      error => this.setState({error})
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId)
  }

  render() {
    return !this.state.error
      ? (<div>{this.props.children(this.state.coords)}</div>)
      : (<h1 className="hot">{this.state.error.message}</h1>)
  }

}