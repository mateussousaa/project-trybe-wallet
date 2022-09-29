import React from 'react';
import PropTypes from 'prop-types';
import trybewalletIcon from '../assets/trybewalletIcon.png';

function LoginForm({ payload: { values, callbacks } }) {
  return (
    <div className="login-form">
      <a className="logo" href="/">
        <h2 className="logo-text">Wallet</h2>
        <img className="logo-image" src={ trybewalletIcon } alt="Trybewallet Logo" />
      </a>
      <form>
        <input
          data-testid="email-input"
          type="email"
          name="emailInput"
          onChange={ callbacks.handleInputs }
          value={ values.emailInput }
          placeholder="Email"
        />
        <input
          data-testid="password-input"
          type="password"
          name="passwordInput"
          onChange={ callbacks.handleInputs }
          value={ values.passwordInput }
          placeholder="Senha"
        />
        <button
          type="button"
          onClick={ callbacks.doLogin }
          disabled={ values.isDisabled }
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
      isDisabled: PropTypes.bool,
    }),
    callbacks: PropTypes.shape({
      handleInputs: PropTypes.func,
      doLogin: PropTypes.func,
    }).isRequired,
  }).isRequired,
};

export default LoginForm;
