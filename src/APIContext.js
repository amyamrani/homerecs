import React from 'react';

const APIContext = React.createContext({
  login: () => {},
  logout: () => {},
  signup: () => {},
  isLoggedIn: false,
})

export default APIContext;