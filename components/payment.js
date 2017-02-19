import React, { Component, PropTypes } from 'react';


class Payment extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    methods: PropTypes.arrayOf(PropTypes.string),
    networks: PropTypes.arrayOf(PropTypes.string),
    total: PropTypes.object,
    options: PropTypes.object,
  }

  static defaultProps = {
    items: [],
    methods: ['basic-card'],
    networks: [
      'visa',
      'mastercard',
      'amex',
      'discover',
      'maestro',
      'diners',
      'jcb',
      'unionpay'
    ],
    total: {
      label: 'Total',
      amount: {
        currency: 'USD',
        value: 0,
      },
    },
    options: {},
  }

  get getProps() {
    const {
      items,
      methods,
      networks,
      total,
      options,
      ...props
    } = this.props;

    return props;
  }

  handleClick = async (event) => {
    if (!window.PaymentRequest) {
      location.href = this.props.href;
      return;
    }

    event.preventDefault();

    const methodData = [{
      supportedMethods: this.props.methods,
      data: { supportedNetworks: this.props.networks },
    }];

    const details = {
      displayItems: this.props.items,
      total: this.props.total,
    };

    const options = this.props.options
  }

  render() {
    return (
      <a
        {...this.getProps}
        onClick={this.handleClick}
      />
    )
  }
}
