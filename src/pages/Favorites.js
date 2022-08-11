import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';

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

  render() {
    const { favorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h4 data-testid="header-user-name">Músicas Favoritas</h4>
        {loading
          ? (<Loading />)
          : ((
            favorites.map(({ trackName, trackId, previewUrl, isFavorite }) => (
              <section key={ trackId }>
                <p>{trackName }</p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor={ trackId }>
                  <input
                    id={ trackId }
                    type="checkbox"
                    data-testid={ `checkbox-music-${trackId}` }
                    onChange={ this.handleClick }
                    checked={ isFavorite }
                  />
                  Favorita
                </label>
              </section>
            ))
          ) || (<p> Não há musicas favoritas </p>))}
      </div>
    );
  }
}

export default Favorites;
