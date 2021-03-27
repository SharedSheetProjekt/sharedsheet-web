import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { ProtectedRoute } from './components/functionality/ProtectedRoute';

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
              <Route exact path="/about" component={ About } />
              <ProtectedRoute exact path="/account" component={ Account } />
              <ProtectedRoute path="/sheets" component={ Sheets } />
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login"component={ Login } />
              <Route exact path="/" component={ Home } />
              <Route path="*" component={ NotFound404 } />
            </Switch>
          </main>

        </Router>
    </div> 
  )
}

export default App

