import React from 'react';
import PropTypes from 'prop-types';

function LoginForm({ payload: { values, callbacks } }) {
  return (
    <div className="login-form">
      <form>
        <input
          data-testid="email-input"
          type="email"
          name="emailInput"
          onChange={ callbacks.handleInputs }
          value={ values.emailInput }
        />
        <input
          data-testid="password-input"
          type="password"
          name="passwordInput"
          onChange={ callbacks.handleInputs }
          value={ values.passwordInput }
        />
        <button
          type="button"
          onClick={ callbacks.doLogin }
          disabled={ callbacks.validateLoginBtn() }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  payload: PropTypes.shape({
    values: PropTypes.shape({
      emailInput: PropTypes.string,
      passwordInput: PropTypes.string,
    }),
    callbacks: PropTypes.shape({
      handleInputs: PropTypes.func,
      doLogin: PropTypes.func,
      validateLoginBtn: PropTypes.func,
    }).isRequired,
  }).isRequired,
};

export default LoginForm;
