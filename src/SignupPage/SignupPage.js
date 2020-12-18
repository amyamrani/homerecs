import React, { Component } from 'react';
import SignupForm from '../SignupForm/SignupForm';

class SignupPage extends Component {
  render() {
    return (
      <div className='page-container'>
        <div>
          <h1 className='section-title'>Sign Up</h1>

          <SignupForm />
        </div>
      </div>
    );
  }
}

export default SignupPage;