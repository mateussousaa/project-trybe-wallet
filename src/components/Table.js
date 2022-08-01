import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, removeAnExpense, editAnExpense } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses
                .sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
                .map((expense) => {
                  const { value, currency, method,
                    tag, description, exchangeRates, id } = expense;
                  return (
                    <tr key={ id }>
                      <td>{ description }</td>
                      <td>{ tag }</td>
                      <td>{ method }</td>
                      <td>{ parseFloat(value).toFixed(2) }</td>
                      <td>{ exchangeRates[currency].name }</td>
                      <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
                      <td>
                        { parseFloat(exchangeRates[currency].ask * value)
                          .toFixed(2) }
                      </td>
                      <td>Real</td>
                      <td>
                        <button
                          type="button"
                          data-testid="delete-btn"
                          id={ id }
                          onClick={ () => { removeAnExpense(parseInt(id, 10)); } }
                        >
                          Excluir
                        </button>
                        <button
                          type="button"
                          data-testid="edit-btn"
                          id={ id }
                          onClick={ () => { editAnExpense(parseInt(id, 10)); } }
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  );
                })
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
