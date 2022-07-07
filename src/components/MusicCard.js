import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music,
      trackName,
      trackId,
      previewUrl,
      onInputChangeMusicCard,
      favorites } = this.props;
    const isFavorite = favorites.some((item) => item.trackId === music.trackId);
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
            onChange={ () => onInputChangeMusicCard(music) }
            checked={ isFavorite }
          />
          Favorita
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  onInputChangeMusicCard: PropTypes.func.isRequired,
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default MusicCard;
