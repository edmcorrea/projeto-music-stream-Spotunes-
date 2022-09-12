import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import logo from '../images/earch.png';
import { getUser } from '../services/userAPI';
import '../css/header.css';

class Header extends React.Component {
  state = {
    loading: false,
    userName: '',
  }

  componentDidMount() {
    this.showUser();
  }

  showUser = () => {
    this.setState({ loading: true });
    getUser().then((response) => this.setState({
      userName: response.name,
      loading: false }));
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component" className="header">
        <img src={ logo } alt="logo" className="imgLogo" />
        <div className="header-info">
          <section className="header-user-name">
            {loading ? <Loading /> : (
              <h4 data-testid="header-user-name">{ userName }</h4>
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
