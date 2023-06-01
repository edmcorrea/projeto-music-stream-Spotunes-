import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import heartOutline from '../images/heart-outline.png';
import heart from '../images/heart.png';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../css/favorites.css';
import logoWhite from '../images/logoSimpleWhite.png';

class Favorites extends React.Component {
  state = {
    favorites: [],
    loading: false,
  }

  componentDidMount() {
    this.favoriteSong();
  }

  favoriteSong = async () => {
    this.setState({
      loading: true,
    });
    const getFavorites = await getFavoriteSongs();
    this.setState({
      favorites: getFavorites,
    }, () => this.setState({ loading: false }));
  }

  handleClick = async (isFavorite, trackId) => {
    const { favorites } = this.state;
    this.setState({ loading: true });
    if (isFavorite) {
      const filterTrack = favorites.filter((music) => music.trackId === Number(trackId));
      console.log(...filterTrack);
      await removeSong(...filterTrack);
      await this.favoriteSong();
    }
    this.setState({ loading: false });
  }

  render() {
    const { favorites, loading } = this.state;
    return (
      <div data-testid="page-favorites" className="page-favorites">
        <Header />
        <section className="favorites">
          <div className="favorites-header">
            <img
              src={ logoWhite }
              alt="logoWhite"
              className="imgLogoWhite"
            />
            <h4
              data-testid="header-user-name"
              className="title-favorites"
            >
              Músicas Favoritas
            </h4>
          </div>
          {loading
            ? <Loading />
            : (
              <div className="cardsFavorite-container">
                {!favorites.length
                  ? (<h2 className="else-card"> Não há musicas favoritas </h2>)
                  : (
                    favorites.map(({ trackName, trackId, previewUrl }) => {
                      const isFavorite = favorites.some((i) => i.trackId === trackId);
                      return (
                        <div
                          key={ trackId }
                          className="cardsFavorite"
                        >
                          <section className="cardFavorite">
                            <div className="trackName">
                              <p>{ trackName }</p>
                            </div>
                            <div className="player">
                              <audio src={ previewUrl } controls>
                                <track kind="captions" />
                                O seu navegador não suporta o elemento
                                {' '}
                                <code>audio</code>
                                .
                              </audio>
                            </div>
                            <button
                              type="button"
                              onClick={ () => this.handleClick(isFavorite, trackId) }
                              className="favorite-button"
                            >
                              <img
                                src={ isFavorite ? heart : heartOutline }
                                alt="favoriteMusic"
                              />
                            </button>
                          </section>
                        </div>
                      );
                    })
                  )}
              </div>
            )}
        </section>
      </div>
    );
  }
}

export default Favorites;
