import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    loading: true,
    album: '',
    musics: [],
  }

  componentDidMount() {
    this.setState({ loading: false });
    this.showCollections();
  }

  showCollections = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    console.log(response);
    const [album, ...musics] = response;
    this.setState({
      album,
      musics,
    });
    // this.setState({showCollectionRender: response});
  }

  render() {
    console.log(this.props);
    // const { listArtistas, match: {params: { id } } } = this.props;
    const { loading, album, musics } = this.state;
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
            <MusicCard musics={ musics } />
          </div>
        )}
        {/* <p>{ listArtistas.find(({ elem }) => elem.collectionId === Number(id)).artistName }</p> */}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
