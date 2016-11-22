import React, {PropTypes} from 'react'
const {func, any} = PropTypes;

export default class Select extends React.Component {
  static propTypes = {
    onChange: func,
    value: any,
    defaultValue: any
  };

  constructor(props, context) {
    super(props, context);

    // set initial state
    const selectedValue = props.value || props.defaultValue;

    this.state = {
      value:  selectedValue,
      label: selectedValue ? this.getOptionByValue(selectedValue).label : 'Not selected',
      isOpened: false
    };

    // bind context of methods to the current component
    this.toggle = this.toggle.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick);
  }


  componentWillUnmount() {

    // clean up if component gets removed
    document.removeEventListener('click', this.onDocumentClick);
  }

  componentWillReceiveProps({value}) {
    value && this.setState(this.getOptionByValue(value))
  }

  toggle() {
    this.setState({isOpened: !this.state.isOpened});
  }

  onSelect({value, label}) {
    this.setState({value, label, isOpened: false});
    this.props.onChange && this.props.onChange(value);
  }

  // close select when clicking outside
  onDocumentClick(event) {
    if (
      !event.target.classList.contains('select') &&
      (!event.target.parentNode || !event.target.parentNode.classList.contains('select')) &&
      (!event.target.parentNode.parentNode || !event.target.parentNode.parentNode.classList.contains('select'))
    ) {
      this.setState({isOpened: false});
    }
  }

  getOptionByValue(value) {
    const option = this.props.children.find(child => child.props.value === value);
    if (!option) {
      throw new Error(`No option found with value ${value}`);
    }

    return option && {
        value: option.props.value,
        label: option.props.children
      };
  }


  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        key: child.props.value,
        onSelect: this.onSelect
      });
    });

    return (
      <div className={this.state.isOpened ? 'select opened' : 'select'}>
        <div className="label" onClick={this.toggle}>{this.state.label} <span className="arrow">▾</span></div>
        <div className="options">
          {childrenWithProps}
        </div>
      </div>
    )
  }
}