import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux/';
import saveEmail from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      passwordInput: '',
    };
  }

  validateLoginBtn = () => {
    const { emailInput, passwordInput } = this.state;
    const minLength = 6;
    // regex supplied by https://regexr.com/3e48o;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailInput.match(regex) && passwordInput.length >= minLength;
  }

  handleInputs = ({ target: { name, value } }) => this.setState({ [name]: value });

  doLogin = () => {
    const { history, saveUserEmail } = this.props;
    const { emailInput } = this.state;
    saveUserEmail(emailInput);
    history.push('/carteira');
  }

  render() {
    const { emailInput, passwordInput } = this.state;
    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            type="email"
            name="emailInput"
            onChange={ this.handleInputs }
            value={ emailInput }
          />
          <input
            data-testid="password-input"
            type="password"
            name="passwordInput"
            onChange={ this.handleInputs }
            value={ passwordInput }
          />
          <button
            type="button"
            onClick={ this.doLogin }
            disabled={ !this.validateLoginBtn() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  saveUserEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUserEmail: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
