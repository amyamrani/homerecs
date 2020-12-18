import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <div className='page-container'>
        <div>
          <h1 className='section-title'>Login</h1>

          <LoginForm />
        </div>
      </div>
    )
  }
}

export default LoginPage;
