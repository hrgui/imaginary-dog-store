import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import ItemViewPage from './marketplace/ItemViewPage';
import SearchPage from './marketplace/SearchPage';
import CollectionPage from './marketplace/CollectionPage';

export function AppController() {
  return <Router>
    <div>
      <Link to="/">Find a Item</Link> | <Link to="/collection">Collection</Link>
    </div>
    <Route path="/" exact component={SearchPage} />
    <Route path="/collection" exact component={CollectionPage} />
    <Route path="/item/:id" exact component={ItemViewPage} />
  </Router>
}