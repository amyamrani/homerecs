import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import EditProductForm from './EditProductForm';

it('EditProductForm renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <EditProductForm product={{ name: 'TV' }}/>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});