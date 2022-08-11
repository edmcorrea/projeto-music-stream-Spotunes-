import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    loading: false,
    album: '',
    musics: [],
    favorites: [],
  }

  componentDidMount() {
    this.showCollections();
    this.favoriteSong();
  }

  favoriteSong = async () => {
    const getFavorites = await getFavoriteSongs();
    this.setState({
      favorites: getFavorites,
    });
  }

  showCollections = async () => {
    const { match: { params: { id } } } = this.props;
    const albumCompleto = await getMusics(id);
    const [album, ...musics] = albumCompleto;
    this.setState({
      album,
      musics,
    });
  }

  addFavorite = async (track) => {
    this.setState({ loading: true });
    await addSong(track);
    await this.favoriteSong();
    this.setState({ loading: false });
  }

  removeFavorite = async (track) => {
    this.setState({ loading: true });
    await removeSong(track);
    await this.favoriteSong();
    this.setState({ loading: false });
  }

  render() {
    const { loading, album, musics, favorites } = this.state;
    console.log(favorites);
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <section>
              <h3 data-testid="artist-name">{ album.artistName }</h3>
              <img src={ album.artworkUrl100 } alt={ album.artistId } />
              <p data-testid="album-name">{ album.collectionName }</p>
            </section>
            { musics.map((music) => {
              const isFavorite = favorites.some((item) => item.trackId === music.trackId);
              return (
                <MusicCard
                  key={ music.trackId }
                  music={ music }
                  trackName={ music.trackName }
                  trackId={ music.trackId }
                  previewUrl={ music.previewUrl }
                  addFavorite={ this.addFavorite }
                  removeFavorite={ this.removeFavorite }
                  favorites={ favorites }
                  isFavorite={ isFavorite }
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
