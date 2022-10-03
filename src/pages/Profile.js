import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../css/profile.css';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import ProfileNoneImage from '../images/profile-none-image.png';
import logoWhite from '../images/logoSimpleWhite.png';

class Profile extends React.Component {
  state = {
    loading: true,
    nameLogin: 'nenhum usuário',
    email: '',
    description: '',
    image: '',
  };

  componentDidMount = async () => {
    const response = await getUser();
    this.setState({
      nameLogin: response.name,
      email: response.email,
      description: response.description,
      image: response.image,
      loading: false,
    });
  }

  render() {
    const { loading, nameLogin, email, description, image } = this.state;
    return (
      <div data-testid="page-profile" className="page-profile">
        <Header />
        <div className="profile">
          {loading ? <Loading />
            : (
              <div className="profile-card">
                <img src={ logoWhite } alt="logoWhite" className="imgLogoWhiteback" />
                <section className="profile-header">
                  <img
                    data-testid="profile-image"
                    src={ image || ProfileNoneImage }
                    alt={ nameLogin }
                  />
                  <h2>Profile</h2>
                </section>
                <div className="profile-info">
                  <div> </div>
                  <div>
                    <h3 className="infos-render">
                      Nome:
                      {' '}
                    </h3>
                    <p className="infos-render">{ nameLogin || 'Nome' }</p>
                  </div>
                  <div>
                    <h3 className="infos-render">
                      email:
                      {' '}
                    </h3>
                    <p className="infos-render">
                      { email || 'sem email' }
                    </p>
                  </div>
                  <div>
                    <h3 className="infos-render">
                      descrição:
                      {' '}
                    </h3>
                    <p className="infos-render">
                      { description || 'sem descrição' }
                    </p>
                  </div>
                </div>
                <Link to="/profile/edit" className="profile-btn">Editar perfil</Link>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Profile;
