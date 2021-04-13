import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from '@apollo/client'
import client from './graphql/config'
import Home from './pages/Home'
import AddMovie from './pages/AddMovie'


function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Cut Meutia Merdekalita
            </p>
            <Home/>
            <AddMovie/>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
