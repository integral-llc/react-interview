
import React, { PropTypes } from 'react'
import { render, findDOMNode } from 'react-dom'
import './styles.css'

const { func, any } = PropTypes;


////////////////////////////////////////////////////////////////////////////////
// Requirements
//
// Make this work like a normal <select><option/></select>
//

class Select extends React.Component {
  static propTypes = {
    onChange: func,
    value: any,
    defaultValue: any
  };

  state = {
    value: this.props.value,
    defaultValue: this.props.defaultValue,
    label: '',
    showOptions: false,
  };

  setValue({value}) {
    let isValueCorrect = false;
    React.Children.forEach(this.props.children, option => {
      if (option.props.value === value) {
        this.setState({
          label: option.props.children,
          value,
        });
        isValueCorrect = true;
      }
    });

    if (!isValueCorrect) throw Error(`${value} is wrong selected value`)
  }

  toggleOptionsAppearence() {
    this.setState({showOptions: !this.state.showOptions});
  }

  _handleClick(e) {
    const arrowDOMNode = findDOMNode(this.refs.arrow);
    const optionsDOMNode = findDOMNode(this.refs.options);

    // hide options list if user clicks outside
    if (optionsDOMNode && !optionsDOMNode.contains(e.target) && !arrowDOMNode.contains(e.target)) {
      this.toggleOptionsAppearence();
    }
  }

  handleClick = e => this._handleClick(e)

  componentDidMount() {
    document.addEventListener('click', this.handleClick)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleClick);
  }

  componentWillMount() {
    // set value (for controlled)
    if (this.state.value) {
      this.setValue({
        value: this.state.value
      })
      return;
    }

    // else set default value
    if (this.state.defaultValue) {
      this.setValue({
        value: this.state.defaultValue
      })
      return;
    }

    // else set value of the first Option
    if (React.Children.count(this.props.children)) {
      this.setValue({
        value: this.props.children[0].props.value
      })
    }
  }

  componentWillReceiveProps(props) {
    if (props.value) this.setValue({value: props.value})
  }

  render() {
    const childrenWithSelectCallbacks = React.Children.map(this.props.children, option => React.cloneElement(option, {
        onSelect: ({e, value}) => {
          if (this.props.onChange) {
            this.props.onChange(value)
          }
          this.setValue({value});
          this.toggleOptionsAppearence();
        }
      })
    );

    return (
      <div className="select">
        <div className="label" onClick={e => {e.stopPropagation(); this.toggleOptionsAppearence()}} ref="arrow">{this.state.label}<span className="arrow">▾</span></div>
        { this.state.showOptions ? (
            <div className="options" ref="options">
              {childrenWithSelectCallbacks}
            </div>
          ) : null
        }
      </div>
    )
  }
}


class Option extends React.Component {

  render() {
    return (
      <div className="option" onClick={e => {e.stopPropagation(); this.props.onSelect({e, value: this.props.value})}}>{this.props.children}</div>
    )
  }
}

class App extends React.Component {
  state = {
    selectValue: 'dosa'
  };

  setToMintChutney() {
    this.setState({selectValue: 'mint-chutney'})
  }

  render() {
    return (
      <div>
        <h1>Select/Option</h1>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>

        <h2>Controlled</h2>
        <p>
          <button onClick={() => this.setToMintChutney()}>Set to Mint Chutney</button>
        </p>

        <Select
          value={this.state.selectValue}
          onChange={(selectValue) => this.setState({ selectValue })}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h2>Uncontrolled</h2>
        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
