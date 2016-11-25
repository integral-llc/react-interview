import React from 'react'
import getAddressFromCoords from '../utils/getAddressFromCoords'
import LoadingDots from '../utils/LoadingDots'

class GeoAddress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      error: ''
    }
  }

  componentWillReceiveProps(props) {
    if (props.coords.latitude && props.coords.longitude) {
      getAddressFromCoords(props.coords.latitude, props.coords.longitude).then(
        city => this.setState({city}),
        error => this.setState({error})
    )
    }
  }

  render() {
    return (
      <div>{this.props.children(this.state)}</div>
    )
  }
}

export default GeoAddress;