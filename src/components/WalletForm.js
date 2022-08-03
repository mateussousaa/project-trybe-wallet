import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  finishEdition,
  fetchCurrenciesAPI,
  fetchCurrenciesToExpenses,
  removeExpense,
} from '../redux/actions/index';

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

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

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  deflateFields = () => this.setState({ value: '', description: '' });

  addExpense = () => {
    const { addAnExpense, expenses } = this.props;
    const id = expenses.length;
    addAnExpense({ ...this.state, id });
    this.deflateFields();
  }

  editExpense = () => {
    const { addAnExpense, removeAnExpense, finishTheEdition, id } = this.props;
    removeAnExpense(id);
    addAnExpense({ ...this.state, id });
    finishTheEdition();
    this.deflateFields();
  };

  render() {
    const { currencies, editorMode } = this.props;
    const { value, description } = this.state;
    const btnIsDisabled = parseInt(value, 10) <= 0 || value === '';
    return (
      <div className="wallet-form">
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
            {
              paymentMethods.map((method) => <option key={ method }>{ method }</option>)
            }
          </select>
          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            {
              tags.map((tag) => <option key={ tag }>{ tag }</option>)
            }
          </select>
          <button
            type="button"
            onClick={ editorMode ? this.editExpense : this.addExpense }
            disabled={ btnIsDisabled }
          >
            { editorMode ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  addAnExpense: PropTypes.func.isRequired,
  finishTheEdition: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editorMode: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  removeAnExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
  editorMode: store.wallet.editor,
  id: store.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAPI()),
  addAnExpense: (expense) => dispatch(fetchCurrenciesToExpenses(expense)),
  removeAnExpense: (id) => dispatch(removeExpense(id)),
  finishTheEdition: () => dispatch(finishEdition()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
