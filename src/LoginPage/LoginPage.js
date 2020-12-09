import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <section className='page-container'>
        <h1 className='section-title'>Login</h1>

        <LoginForm />
      </section>
    )
  }
}

export default LoginPage;
