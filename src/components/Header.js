import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userEmail } = this.props;
    const expenseTotal = 0;
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
};

const mapStateToProps = (store) => ({
  userEmail: store.user.email,
});

export default connect(mapStateToProps)(Header);
