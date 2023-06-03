import React from 'react';
import PropTypes from 'prop-types';
import heartOutline from '../images/heart-outline.png';
import heart from '../images/heart.png';
import '../css/musicCard.css';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  handleClick = () => {
    const { addFavorite, removeFavorite, isFavorite, music } = this.props;
    if (isFavorite) {
      removeFavorite(music);
    } else {
      addFavorite(music);
    }
  }

  render() {
    const { trackName, trackId, previewUrl, isFavorite, loading } = this.props;
    return (
      <div>
        {loading ? <Loading /> : (
          <section key={ trackId } className="cardAlbum">
            <div>
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
              src={ isFavorite ? heart : heartOutline }
              onClick={ this.handleClick }
              className="album-button"
            >
              <img src={ isFavorite ? heart : heartOutline } alt="favoriteMusic" />
            </button>
          </section>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  addFavorite: PropTypes.func.isRequired,
  // favorites: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  previewUrl: PropTypes.string.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
