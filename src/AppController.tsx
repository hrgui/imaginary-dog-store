import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ItemViewPage from './marketplace/ItemViewPage';
import SearchPage from './marketplace/SearchPage';

export function AppController() {
  return <Router>
    <Route path="/" exact component={SearchPage} />
    <Route path="/item/:id" exact component={ItemViewPage} />
  </Router>
}