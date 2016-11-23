import React, {PropTypes} from 'react'
import $ from 'jquery';

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
      selectedOption: selectedValue ? this.getOptionByValue(props.value || props.defaultValue) : {
        value: '',
        label: 'Not selected'
      },
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
    value && this.setState({selectedOption: this.getOptionByValue(value)})
  }

  toggle() {
    this.setState({isOpened: !this.state.isOpened});
  }

  onSelect(selectedOption) {
    this.setState({selectedOption, isOpened: false});
    this.props.onChange && this.props.onChange(selectedOption.value);
  }

  // close select when clicking outside
  onDocumentClick(event) {
    if ($(event.target).closest('.js-select').length === 0) {
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
      <div className='js-select select'>
        <div className="label" onClick={this.toggle}>{this.state.selectedOption.label} <span className="arrow">▾</span></div>
        <div className="options" hidden={!this.state.isOpened}>
          {childrenWithProps}
        </div>
      </div>
    )
  }
}
