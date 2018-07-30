import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import MainApp from './MainApp';
import About from './About';

const App = () => (
  <div>
    <Route exact path='/' component={MainApp} />
    <Route path='/employee' component={About} />
  </div>
)

export default App;
