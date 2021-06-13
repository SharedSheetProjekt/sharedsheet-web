import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { ProtectedRoute } from './components/functionality/ProtectedRoute';

import './CSS/App.css';

import Header from './components/structures/Header';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Sheets from './components/pages/Sheets';
import Courses from './components/pages/Courses';
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
              <ProtectedRoute path="/courses" component={ Courses } />
              <ProtectedRoute path="/sheets" component={ Sheets } />
              <Route exact path="/register" component={ Register } />
              <Redirect from="/sharedsheet-web" to="/" />
              <Route exact path="/" component={ Login } />
              <Route path="*" component={ NotFound404 } />
            </Switch>
          </main>

        </Router>
    </div> 
  )
}

export default App

