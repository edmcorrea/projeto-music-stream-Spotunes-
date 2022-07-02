import React from 'react';
import Loading from '../pages/Loading';

class Header extends React.Component {
  state = {
    loading: false,
  }

  render() {
    const { loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : (
          <h1>Header</h1>
        )}
      </header>
    );
  }
}

export default Header;
