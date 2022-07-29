import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchCurrenciesAPI,
  fetchCurrenciesToExpenses,
} from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  addExpense = () => {
    const { addAnExpense, expenses } = this.props;
    const id = expenses.length;
    addAnExpense({ ...this.state, id });
    this.setState({ value: '', description: '' });
  }

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    const btnIsDisabled = parseInt(value, 10) <= 0 || value === '';
    return (
      <div>
        WalletForm
        <form>
          <input
            name="value"
            data-testid="value-input"
            type="number"
            onChange={ this.handleChange }
            value={ value }
          />
          <input
            name="description"
            data-testid="description-input"
            type="text"
            onChange={ this.handleChange }
            value={ description }
          />
          <select
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {
              currencies
                .map((currency) => <option key={ currency }>{ currency }</option>)
            }
          </select>
          <select
            name="method"
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button
            type="button"
            onClick={ this.addExpense }
            disabled={ btnIsDisabled }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  addAnExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAPI()),
  addAnExpense: (expense) => dispatch(fetchCurrenciesToExpenses(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
