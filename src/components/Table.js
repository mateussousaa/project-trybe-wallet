import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../redux/actions';

const tableHeaders = [
  'Descrição', 'Tag', 'Método de pagamento', 'Valor',
  'Moeda', 'Câmbio utilizado', 'Valor convertido',
  'Moeda de conversão', 'Editar/Excluir',
];

class Table extends Component {
  fillRow = (expense) => {
    const { removeAnExpense, editAnExpense } = this.props;
    const { value, currency, method, tag, description, id, exchangeRates } = expense;
    const { ask, name } = exchangeRates[currency];
    const convertedValue = (parseFloat(ask) * parseFloat(value)).toFixed(2);
    console.log(typeof id);
    return (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ parseFloat(value).toFixed(2) }</td>
        <td>{ name }</td>
        <td>{ parseFloat(ask).toFixed(2) }</td>
        <td>{ convertedValue }</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => { removeAnExpense(id); } }
          >
            Excluir
          </button>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => { editAnExpense(id); } }
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div className="expenses-table">
        <table>
          <thead>
            <tr>
              {
                tableHeaders.map((th) => <th key={ th }>{ th }</th>)
              }
            </tr>
          </thead>
          <tbody>
            {
              expenses
                .sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
                .map((expense) => this.fillRow(expense))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  editAnExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeAnExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeAnExpense: (id) => dispatch(removeExpense(id)),
  editAnExpense: (id) => dispatch(editExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
