import React, { Component } from 'react';
import Head from 'next/head';


class Payment extends Component {
  state = {
    products: [],
    response: null,
    error: null,
  }

  addToCart = () => {
    const product = {
      label: 'Curso de React',
      amount: {
        currency: 'USD',
        value: '95.00',
      },
    };

    this.setState(state => ({
      response: null,
      error: null,
      products: state.products.concat(product),
    }));
  }

  buy = () => {
    try {
      this.setState({ error: null, response: null });

      const methodData = [{
        supportedMethods: ['basic-card'],
        data: {
          supportedNetworks: [
            'visa',
            'mastercard',
            'amex',
            'discover',
            'maestro',
            'diners',
            'jcb',
            'unionpay'
          ],
        },
      }];
      console.debug('methodData', methodData);

      const details = {
        displayItems: this.state.products,
        total: {
          label: 'Total',
          amount: {
            currency: 'USD',
            value: this.state.products
              .map(product => product.amount.value)
              .map(price => parseInt(price, 10))
              .reduce((total, price) => total + price, 0),
          },
        },
      };
      console.debug('details', details);

      const options = {
        requestShipping: false,
        requestPayerEmail: true,
        requestPayerPhone: false,
        requestPayerName: true
      };
      console.debug('options', options);

      const request = new PaymentRequest(methodData, details, options);

      // abortar luego de 5 minutos
      this.timer = setTimeout(
        request.abort,
        1000 * 60 * 5
      );

      request.show()
        .then(response => {
          this.setState({
            response: JSON.stringify(response.toJSON(), null, 2),
          });
          response.complete('success');
          clearTimeout(this.timer);
        })
        .catch(error => {
          console.error(error);
          this.setState({ error });
          clearTimeout(this.timer);
        })
    } catch (error) {
      console.error(error);
      this.setState({ error });
    }
  }

  render() {
    return (
      <main>
        <Head>
          {/* <script
            src="https://storage.googleapis.com/prshim/v1/payment-shim.js"
          /> */}
        </Head>

        <div>
          <mark>Agregaste {this.state.products.length} al carrito</mark>
          <button onClick={this.addToCart}>
            Agregar producto
          </button>
        </div>

        <div>
          <button onClick={this.buy}>
            Comprar
          </button>
        </div>

        {this.state.response && (
          <div>
            <mark>response</mark>
            <pre>
              {this.state.response}
            </pre>
          </div>
        )}

        {this.state.error && (
          <div>
            <mark>error</mark>
            <pre>
              {this.state.error.message}
              {this.state.error.stack}
            </pre>
          </div>
        )}
      </main>
    );
  }
}


export default Payment;
