import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../css/profile.css';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import ProfileNoneImage from '../images/profile-none-image.png';

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
                <section className="profile-header">
                  <img
                    data-testid="profile-image"
                    src={ image || ProfileNoneImage }
                    alt={ nameLogin }
                  />
                  <h2>Profile</h2>
                </section>
                <div className="profile-info">
                  <h4>
                    Nome:
                    {' '}
                  </h4>
                  <p>{ nameLogin || 'Nome' }</p>
                  <h4>
                    email:
                    {' '}
                  </h4>
                  <p>
                    { email || 'sem email' }
                  </p>
                  <h4>
                    descrição:
                    {' '}
                  </h4>
                  <p>
                    { description || 'sem descrição' }
                  </p>
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
