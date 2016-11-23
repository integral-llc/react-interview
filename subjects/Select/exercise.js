
import { PropTypes } from 'react';
import React from 'react';
import { render } from 'react-dom'
import './styles.css'


const { func, any } = PropTypes;

////////////////////////////////////////////////////////////////////////////////
// Requirements
//
// Make this work like a normal <select><option/></select>
//
//@INFO FOR THE SAKE OF TIME, COMPONENTS ARE NOT IN SEPARATE FILES
class Select extends React.Component {

  state = {
    isHidden: true,
    value: null,
    label: null
  };

  static propTypes = {
    onChange: func,
    value: any,
    defaultValue: any
  };

  constructor(props) {
    super(props);
    this.onOptionClick = ::this.onOptionClick;
    this.onBlur = ::this.onBlur;
  }

  componentWillReceiveProps({value, children: options}) {
    if (!value) return;
    const option = options.find((component) => component.props.value === value);
    const label = option ? option.props.children : undefined;
    this.onOptionClick(value, label);
  }

  onOptionClick(value = this.state.value, label = this.state.label) {
    this.setState({
      value,
      label,
      isHidden: true
    });
  }
  
  onClick() {
    const isHidden = !this.state.isHidden;
    this.setState({
      isHidden
    });
  }

  onBlur() {
    this.setState({isHidden: true});
  }

  render() {
    const {onOptionClick} = this;
    const {value: selectValue, onChange, defaultValue} = this.props;
    const childrenWithProps = React.Children.map(this.props.children, (child) =>
      React.cloneElement(child, {
        onOptionClick,
        selectValue,
        onChange,
        defaultValue,
        key: child.props.value
      }));

    return (
      <div className="select" tabIndex="1" onBlur={this.onBlur}>
        <div className="label" onClick={::this.onClick}>
          {this.state.label}
          <span className="arrow">▾</span>
        </div>
        <div className="options" hidden={this.state.isHidden}>
          {childrenWithProps}
        </div>
      </div>
    )
  }
}


class Option extends React.Component {

  static propTypes = {
    onOptionClick: func,
    onChange: func,
    value: any,
    selectValue: any,
    defaultValue: any
  };

  componentDidMount() {
    const {value, defaultValue, selectValue, onOptionClick, children:label} = this.props;
    const initValue  = selectValue || defaultValue;
    if (value === initValue) {
      onOptionClick(value, label);
    }
  }

  render() {
    const {value, children: label, onChange, onOptionClick} = this.props;
    const onClick = () => {
      onChange && onChange(value);
      onOptionClick(value, label);
    };

    return (
      <div onClick={onClick} className="option">
        {label}
      </div>
    )
  }
}

class App extends React.Component {

  state = {
    selectValue: 'dosa'
  };

  constructor() {
    super();
    this.setToMintChutney = ::this.setToMintChutney;
  }

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
          <button onClick={this.setToMintChutney}>Set to Mint Chutney</button>
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
