import React from 'react';
import PropTypes from 'prop-types';

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
    const { trackName, trackId, previewUrl, isFavorite } = this.props;
    return (
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
    );
  }
}

MusicCard.propTypes = {
  addFavorite: PropTypes.func.isRequired,
  // favorites: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  previewUrl: PropTypes.string.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
