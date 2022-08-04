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
    return (
      <tr key={ id }>
        <td data-label="Descrição:">{ description }</td>
        <td data-label="Categoria:">{ tag }</td>
        <td data-label="Pagamento:">{ method }</td>
        <td data-label="Valor:">{ parseFloat(value).toFixed(2) }</td>
        <td data-label="De:">{ name }</td>
        <td data-label="Câmbio:">{ parseFloat(ask).toFixed(2) }</td>
        <td data-label="Valor total:">{ convertedValue }</td>
        <td data-label="Para:">Real</td>
        <td
          data-label="Editar/Excluir"
          className="buttons-section"
        >
          <button
            type="button"
            id="delete-btn"
            data-testid="delete-btn"
            onClick={ () => { removeAnExpense(id); } }
          >
            Excluir
          </button>
          <button
            type="button"
            id="edit-btn"
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
        <h2>Tabela de despesas</h2>
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
