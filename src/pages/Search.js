import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    searchInput: '',
    isValidateButtonDisabled: true,
    resultsInputArtistas: false,
    resultsInputEmpty: false,
    showResults: [],
    loading: false,
  }

  onClickPesquisar = async (event) => {
    const { inputSearch } = this.props;
    event.preventDefault();
    // event.target.value = '';
    this.setState({ showResults: [], loading: true });
    const { searchInput } = this.state;
    const showResults = await searchAlbumsAPI(searchInput);
    if (showResults.length) {
      this.setState({
        showResults: await searchAlbumsAPI(searchInput),
        resultsInputArtistas: true,
        resultsInputEmpty: false,
        loading: false,
      }, () => inputSearch(searchInput));
    } else {
      this.setState({
        resultsInputEmpty: true,
        resultsInputArtistas: false,
        loading: false,
      });
    }
  }

  ButtonDisabled = () => {
    const { searchInput } = this.state;
    const validateLoginLength = 2;
    if (searchInput.length >= validateLoginLength) {
      this.setState({ isValidateButtonDisabled: false });
    } else {
      this.setState({ isValidateButtonDisabled: true });
    }
  };

  onInputChance = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.ButtonDisabled());
  };

  render() {
    const {
      isValidateButtonDisabled,
      resultsInputArtistas,
      searchInput,
      showResults,
      resultsInputEmpty,
      loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <form>
              <label htmlFor="search-input">
                <input
                  id="search-input"
                  type="text"
                  name="searchInput"
                  data-testid="search-artist-input"
                  onChange={ this.onInputChance }
                />
              </label>
              <button
                type="submit"
                disabled={ isValidateButtonDisabled }
                data-testid="search-artist-button"
                onClick={ this.onClickPesquisar }
              >
                Pesquisar
              </button>
            </form>
            { (resultsInputArtistas) ? (
              <div>
                <p>
                  {`Resultado de álbuns de: ${searchInput}`}
                </p>
                {showResults.map((artista, index) => (
                  <Link
                    to={ `/album/${artista.collectionId}` }
                    data-testid={ `link-to-album-${artista.collectionId}` }
                    key={ index }
                  >
                    <section>
                      <img src={ artista.artworkUrl100 } alt={ artista.artistId } />
                      <h4>{ artista.artistName }</h4>
                      <p>{ artista.collectionName }</p>
                    </section>
                  </Link>
                ))}
              </div>
            ) : null}
            { (resultsInputEmpty) ? (
              <h1>Nenhum álbum foi encontrado</h1>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  inputSearch: PropTypes.func.isRequired,
};

export default Search;
