import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    isValidateButtonDisabled: true,
  }

  onInputChance = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.ButtonDisabled());
  };

  ButtonDisabled = () => {
    const { name } = this.state;
    const validateLoginLength = 2;
    if (name.length >= validateLoginLength) {
      this.setState({ isValidateButtonDisabled: false });
    } else {
      this.setState({ isValidateButtonDisabled: true });
    }
  };

  render() {
    const { isValidateButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-input">
            <input
              id="search-input"
              type="text"
              name="name"
              data-testid="search-artist-input"
              onChange={ this.onInputChance }
            />
          </label>
          <button
            type="submit"
            disabled={ isValidateButtonDisabled }
            data-testid="search-artist-button"
            onClick={ () => {} }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
