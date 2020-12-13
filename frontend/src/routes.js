import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import CreateProduct from './pages/CreateProduct';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/new" component={CreateProduct} />
      </Switch>
    </BrowserRouter>
  );
}