import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesAPI } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        WalletForm
        <form>
          <input
            data-testid="value-input"
            type="number"
          />
          <input
            data-testid="description-input"
            type="text"
          />
          <select
            data-testid="currency-input"
          >
            {
              currencies
                .map((currency) => <option key={ currency }>{ currency }</option>)
            }
          </select>
          <select
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
