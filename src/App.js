import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './CSS/App.css';

import Header from './components/structures/Header';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Sheets from './components/pages/Sheets';
import Account from './components/pages/Account';
import About from './components/pages/About';
import NotFound404 from './components/pages/NotFound404';

const App = () => {
  return (
    <div id="app">
      <Router>
        <Header />

        <main id="main">
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/account">
              <Account />
            </Route>
            <Route path="/sheets">
              <Sheets />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route>
              <NotFound404 path="*" />
            </Route>
          </Switch>
        </main>
      </Router> 
    </div> 
  )
}

/*function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {*//* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected *//*}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}*/

export default App

