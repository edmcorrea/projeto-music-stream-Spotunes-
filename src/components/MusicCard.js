import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musics } = this.props;
    console.log(musics);
    return (
      <div>
        <h2>cardAlbum</h2>
        {
          musics.map((music) => (
            <section key={ music.collectionId }>
              <p>{ music.trackName }</p>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            </section>
          ))
          // null
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  // album: PropTypes.shape({
  //   artistName: PropTypes.string.isRequired,
  //   artworkUrl100: PropTypes.string.isRequired,
  //   artistId: PropTypes.string.isRequired,
  //   collectionName: PropTypes.string.isRequired,
  // }),
  musics: PropTypes.arrayOf(
    PropTypes.shape({
      trackName: PropTypes.string.isRequired,
      previewUrl: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

// MusicCard.defaultProps = { musics: [] }

export default MusicCard;
