import React from 'react';
import { Route, Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import MainApp from './MainApp';
import About from './About';

const history = createBrowserHistory()
const App = () => (
  <Router history={history}>
    <div>
      <Route exact path='/' component={MainApp} />
      <Route path='/employee' component={About} />
    </div>
  </Router>
)

export default App;
