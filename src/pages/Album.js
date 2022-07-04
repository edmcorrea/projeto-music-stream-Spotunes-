import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.setState({ loading: false });
    this.showColletions();
  }

  showColletions = async () => {
    const { match: { params: { id } } } = this.props;
    const showColletion = await getMusics(id);
    console.log(showColletion);
  }

  render() {
    console.log(this.props);
    // const { listArtistas, match: {params: { id } } } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        {/* {loading} */}
        {/* <p>{ listArtistas.find(({ elem }) => elem.collectionId === Number(id)).artistName }</p> */}
      </div>
    );
  }
}

Album.propTypes = {
//   listArtistas: PropTypes.arrayOf(
//     PropTypes.shape({
//       artistId: PropTypes.string.isRequired,
//       artistName: PropTypes.string.isRequired,
//       collectionId: PropTypes.string.isRequired,
//       collectionName: PropTypes.string.isRequired,
//       collectionPrice: PropTypes.string.isRequired,
//       artworkUrl100: PropTypes.string.isRequired,
//       releaseDate: PropTypes.string.isRequired,
//       trackCount: PropTypes.string.isRequired,
//     }),
//   ),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  })
};

export default Album;
