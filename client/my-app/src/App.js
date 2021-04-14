import './App.css';
import { ApolloProvider } from '@apollo/client'
import client from './graphql/config'
import Home from './pages/HomePage'
import AddMovie from './pages/AddMovie'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Favorite from './pages/FavoritePage';
import EditMovie from './pages/EditMovie';

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <div className="App">
        <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/addmovie">Add Movie</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/favorites">
            <Favorite />
          </Route>
          <Route path="/addmovie">
            <AddMovie />
          </Route>
          <Route path="/movies/:id">
            <EditMovie />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
