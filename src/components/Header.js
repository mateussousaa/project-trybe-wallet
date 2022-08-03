import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    return expenses.reduce((acc, cur) => {
      const { currency, value, exchangeRates } = cur;
      return acc + (exchangeRates[currency].ask * value);
    }, 0).toFixed(2);
  }

  render() {
    const { userEmail } = this.props;
    const expenseTotal = this.sumExpenses();
    const currentCurrency = 'BRL';
    return (
      <div className="wallet-header">
        Header
        <p data-testid="email-field">{ userEmail }</p>
        <div>
          <p data-testid="total-field">{ expenseTotal }</p>
          <span data-testid="header-currency-field">{ currentCurrency }</span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (store) => ({
  userEmail: store.user.email,
  expenses: store.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
