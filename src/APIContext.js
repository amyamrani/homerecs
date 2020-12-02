import React from 'react';

const APIContext = React.createContext({
  products: [],
  groups: [],
  addProduct: () => {},
  editProduct: () => {},
  deleteProduct: () => {},
  addGroup: () => {},
  editGroup: () => {},
  deleteGroup: () => {},
  login: () => {},
  logout: () => {},
  user: undefined,
})

export default APIContext;