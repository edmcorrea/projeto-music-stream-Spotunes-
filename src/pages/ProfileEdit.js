import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import userIcon from '../images/userIcon.png';
import { getUser, updateUser } from '../services/userAPI';
import '../css/profileEdit.css';
import Loading from './Loading';
import logoWhite from '../images/logoSimpleWhite.png';

class ProfileEdit extends React.Component {
  state = {
    redirect: false,
    loading: false,
    formIncomplete: false,
    name: '',
    email: '',
    description: '',
    image: '',
    stateImgChange: false,
  };

  componentDidMount = async () => {
    const { name, email, description, image } = await getUser();
    this.setState({
      name,
      email,
      description,
      image,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      if (name === 'name' && value.length === 0) {
        this.setState({ formIncomplete: true });
      } else {
        this.setState({ formIncomplete: false });
      }
    });
  }

  saveProfile = async () => {
    this.setState({ loading: true }, async () => {
      const { name, email, description, image } = this.state;
      await updateUser({ name, email, description, image });
      this.setState({ loading: false, redirect: true });
    });
  }

  render() {
    const { redirect,
      loading,
      formIncomplete,
      name,
      email,
      description,
      image,
      stateImgChange } = this.state;

    if (redirect) {
      return <Redirect to="/profile" />;
    }
    return (
      <div
        data-testid="page-profile-edit"
        className="page-profile-edit"
      >
        <Header />
        {loading ? <Loading /> : (
          <section className="profile-edit">
            <img src={ logoWhite } alt="logoWhite" className="imgLogoWhiteback" />
            <div className="profile-edit-header">
              {stateImgChange
                ? (
                  <div className="img-profile-editado">
                    <p>Insira a Imagem URL:</p>
                    <input
                      placeholder="Insira a Imagem URL"
                      type="text"
                      name="image"
                      id="img-input"
                      value={ image }
                      onChange={ this.handleChange }
                    />
                    <button
                      className="profile-edit-btn"
                      type="button"
                      disabled={ formIncomplete }
                      onClick={ () => this.setState({ stateImgChange: false }) }
                    >
                      Save Image
                    </button>
                  </div>
                )
                : (
                  <input
                    className="img-profile"
                    type="image"
                    alt="userImage"
                    src={ image || userIcon }
                    onClick={ () => this.setState({ stateImgChange: true }) }
                  />
                )}
              <h2>Profile Edit</h2>
            </div>
            <form className="profile-edit-info">

              <div>
                <section className="profile-edit-inputs">
                  <h3>Nome</h3>
                  <p>Fique à vontade  para usr seu nome social</p>
                  <input
                    placeholder="Username"
                    type="text"
                    data-testid="edit-input-name"
                    name="name"
                    value={ name }
                    onChange={ this.handleChange }
                  />
                  <h3>E-mail</h3>
                  <p>Escolha um e-mail que consulte diariamente</p>
                  <input
                    placeholder="E-mail"
                    type="email"
                    data-testid="edit-input-email"
                    name="email"
                    value={ email }
                    onChange={ this.handleChange }
                  />
                  <h3>Descrição</h3>
                  <textarea
                    placeholder="Description"
                    type="text-area"
                    data-testid="edit-input-description"
                    name="description"
                    value={ description }
                    onChange={ this.handleChange }
                  />
                </section>
              </div>
              <button
                className="profile-edit-btn"
                data-testid="edit-button-save"
                type="button"
                disabled={ formIncomplete }
                onClick={ this.saveProfile }
              >
                Salvar
              </button>
            </form>
          </section>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
