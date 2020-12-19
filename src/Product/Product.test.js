import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Product from './Product';

it('Product renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Product product={{ url: 'http://www.bestbuy.com' }}/>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});