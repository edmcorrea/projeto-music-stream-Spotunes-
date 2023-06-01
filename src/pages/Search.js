import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../css/search.css';
import logoWhite from '../images/logoSimpleWhite.png';

class Search extends React.Component {
  state = {
    searchInput: '',
    isValidateButtonDisabled: true,
    showResults: [],
    loading: false,
  }

  onClickPesquisar = async (event) => {
    event.preventDefault();
    this.setState({ showResults: [], loading: true });
    const { searchInput } = this.state;
    const showResults = await searchAlbumsAPI(searchInput);
    if (showResults.length) {
      this.setState({
        showResults: await searchAlbumsAPI(searchInput),
        loading: false,
      });
    } else {
      this.setState({
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
      searchInput,
      showResults,
      loading } = this.state;
    return (
      <div
        data-testid="page-search"
        className="page-search"
      >
        <Header />
        { loading ? <Loading /> : (
          <div className="search">
            <form>
              <img src={ logoWhite } alt="logoWhite" className="imgLogoWhite" />
              <label
                htmlFor="search-input"
                className="search-label"
              >
                <input
                  className="search-input"
                  id="search-input"
                  type="text"
                  name="searchInput"
                  data-testid="search-artist-input"
                  onChange={ this.onInputChance }
                  placeholder="DIGITE AQUI SUA PESQUISA"
                />
              </label>
              <button
                className="search-btn"
                type="submit"
                disabled={ isValidateButtonDisabled }
                data-testid="search-artist-button"
                onClick={ this.onClickPesquisar }
              >
                Pesquisar
              </button>
            </form>
            <section className="results-search">
              { (showResults.length) ? (
                <div className="result-search">
                  <h2>
                    {`Resultado de álbuns de: ${searchInput}`}
                  </h2>
                  <section className="cards-search">
                    {showResults.map((artista, index) => (
                      <Link
                        to={ `/album/${artista.collectionId}` }
                        data-testid={ `link-to-album-${artista.collectionId}` }
                        key={ index }
                        className="card-search"
                      >
                        <img src={ artista.artworkUrl100 } alt={ artista.artistId } />
                        <h4>{ artista.artistName }</h4>
                        <p>{ artista.collectionName }</p>
                      </Link>
                    ))}
                  </section>
                </div>
              ) : <h1 className="else-card">Nenhum álbum foi encontrado</h1>}
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
