import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import logo from '../images/logo-bg.png';
import { getUser } from '../services/userAPI';
import '../css/header.css';

class Header extends React.Component {
  state = {
    loading: false,
    userName: '',
    image: '',
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const { name, image } = await getUser();
    this.setState({
      userName: name,
      image,
    }, () => this.setState({ loading: false }));
  }

  render() {
    const { loading, userName, image } = this.state;
    return (
      <header data-testid="header-component" className="header">
        <img src={ logo } alt="logo" className="imgLogo" />
        <div className="header-info">
          <section className="header-user-name">
            {loading ? <Loading /> : (
              <div className="users-header">
                <img className="header-user-image" src={ image } alt="userImage" />
                <h4 data-testid="header-user-name">{ userName }</h4>
              </div>
            )}
          </section>
          <section className="links-header">
            <Link to="/search" data-testid="link-to-search">Search</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          </section>
        </div>

      </header>
    );
  }
}

export default Header;
