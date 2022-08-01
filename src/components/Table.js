import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
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
              expenses.map((expense) => {
                const { value, currency, method,
                  tag, description, exchangeRates } = expense;
                console.log(typeof value);
                return (
                  <tr key={ currency }>
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
                    <td>Buttons</td>
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
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
