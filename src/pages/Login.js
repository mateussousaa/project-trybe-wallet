import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux/';
import LoginForm from '../components/LoginForm';
import saveEmail from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInput: 'user@user.com',
      passwordInput: 'password',
    };
  }

  validateLoginBtn = () => {
    const { emailInput, passwordInput } = this.state;
    const minLength = 6;
    // regex supplied by https://regexr.com/3e48o;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return !(emailInput.match(regex) && passwordInput.length >= minLength);
  }

  handleInputs = ({ target: { name, value } }) => this.setState({ [name]: value });

  doLogin = () => {
    const { history, saveUserEmail } = this.props;
    const { emailInput } = this.state;
    saveUserEmail(emailInput);
    history.push('/carteira');
  }

  render() {
    const payload = {
      values: { ...this.state, isDisabled: this.validateLoginBtn() },
      callbacks: {
        handleInputs: this.handleInputs,
        doLogin: this.doLogin,
      },
    };
    return (
      <div className="login-page">
        <LoginForm payload={ payload } />
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
