import React, { Component } from 'react';
import SignupForm from '../SignupForm/SignupForm';

class SignupPage extends Component {
  render() {
    return (
      <div className='page-container'>
        <section>
          <h1>Sign Up</h1>
          <SignupForm />
        </section>
      </div>
    );
  }
}

export default SignupPage;