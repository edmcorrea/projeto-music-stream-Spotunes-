import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../images/logo-bg.png';
import userIcon from '../images/userIcon.png';
import '../css/login.css';

class Login extends React.Component {
  state = {
    name: '',
    isValidateButtonDisabled: true,
    loading: false,
    usuariologado: false,
    image: userIcon,
  };

  ButtonDisabled = () => {
    const { name } = this.state;
    const validateLoginLength = 3;
    if (name.length >= validateLoginLength) {
      this.setState({ isValidateButtonDisabled: false });
    } else {
      this.setState({ isValidateButtonDisabled: true });
    }
  };

  onClickEntrar = (event) => {
    event.preventDefault();
    const { name, image } = this.state;
    this.setState({ loading: true });
    createUser({ name, image })
      .then(() => {
        this.setState({ usuariologado: true });
      });
  };

  onInputChance = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.ButtonDisabled());
  };

  render() {
    const { isValidateButtonDisabled, loading, usuariologado } = this.state;
    if (usuariologado) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login" className="login">
        {loading ? (
          <Loading />
        ) : (
          <form className="form-login">
            <img className="logo-bg-login" src={ logo } alt="logo imagem" />
            <h1 className="name-login">SpoTunes</h1>
            <label htmlFor="name-input">
              <input
                className="input"
                placeholder="Username"
                id="name-input"
                type="text"
                name="name"
                data-testid="login-name-input"
                onChange={ this.onInputChance }
              />
            </label>
            <button
              className="login-btn"
              type="submit"
              disabled={ isValidateButtonDisabled }
              data-testid="login-submit-button"
              onClick={ this.onClickEntrar }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
