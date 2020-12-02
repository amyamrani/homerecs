import React, { Component } from 'react';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: [],
      lastName: [],
      email: [],
      password: [],
    }
  }

  render() {
    return (
      <form className='signup-form'>
        <div>
          <label htmlFor='first-name'>First name</label>
          <input placeholder='First Name' type='text' name='first-name' id='first-name' />
        </div>
        <div>
          <label htmlFor='last-name'>Last name</label>
          <input type='text' name='last-name' id='last-name' placeholder='Last Name' />
        </div>
        <div>
          <label htmlFor='username'>Email</label>
          <input type='text' name='username' id='username' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' />
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    );
  }
}

export default SignupForm;