import React from 'react';
import { Route, Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import MainApp from './MainApp';
import About from './About';
import AddNewEmployee from './AddNewEmployee';

const history = createBrowserHistory()
const App = () => (
  <Router history={history}>
    <div>
      <Route exact path='/' component={MainApp} />
      <Route path='/employee' component={About} />
      <Route exact path='/add' component={AddNewEmployee} />
    </div>
  </Router>
)

export default App;
