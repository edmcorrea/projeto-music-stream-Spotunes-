import React from 'react';
import giftunes from '../images/spotunes.gif';
import '../css/loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="page-loading">
        <img className="gif" src={ giftunes } alt="gif spoTunes" />
      </div>
    );
  }
}

export default Loading;
