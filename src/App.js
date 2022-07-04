import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import searchAlbumsAPI from './services/searchAlbumsAPI';

class App extends React.Component {
  state = {
    listArtistas: [],
  }

  inputSearch = async (inputSearch) => {
    const showResults = await searchAlbumsAPI(inputSearch);
    this.setState({ listArtistas: showResults });
  }

  render() {
    const { listArtistas } = this.state;
    return (
      <>
        <p>TrybeTunes</p>
        <Route
          path="/search"
          render={ () => (
            <Search
              inputSearch={ this.inputSearch }
            />
          ) }
        />
        <Route
          path="/album/:id"
          render={ (propsRouter) => (
            <Album
              { ...propsRouter }
              listArtistas={ listArtistas }
            />
          ) }
        />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="*" component={ NotFound } />
      </>
    );
  }
}

export default App;
