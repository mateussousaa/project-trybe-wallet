import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length === 0) return 0;
    return expenses.reduce((acc, cur) => {
      const {
        currency,
        value,
        exchangeRates,
      } = cur;
      return acc + (exchangeRates[currency].ask * value);
    }, 0);
  }

  render() {
    const { userEmail } = this.props;
    const expenseTotal = this.sumExpenses().toFixed(2);
    const currentCurrency = 'BRL';
    return (
      <div>
        Header
        <p
          data-testid="email-field"
        >
          { userEmail }
        </p>
        <div>
          <p
            data-testid="total-field"
          >
            { expenseTotal }
          </p>
          <span
            data-testid="header-currency-field"
          >
            { currentCurrency }
          </span>
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
