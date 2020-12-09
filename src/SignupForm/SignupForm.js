import React, { Component } from 'react';
import './SignupForm.css';
import { Link, Redirect } from 'react-router-dom';
import APIContext from '../APIContext';
import config from '../config';

class SignupForm extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errorMessage: '',
    }
  }

  handleSubmit = (e) => {
    const user = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    fetch(`${config.API_BASE_URL}/api/users/signup`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user)
    })
      .then((res) => {
        return !res.ok
          ? res.json().then((e) => Promise.reject(e))
          : res.json();
      })
      .then(res => {
        this.context.signup(res);
      })
      .catch(err => {
        console.log("WHAT IS THE PROBLEM", err)
        this.setState({errorMessage: 'Email and password are required.'})
      });

    e.preventDefault();
  }

  render() {
    if (this.context.isLoggedIn === true) {
      return <Redirect to='/dashboard' />
    }

    return (
      <form className='signup-form' onSubmit={this.handleSubmit}>
        {this.state.errorMessage && (
          <div>{this.state.errorMessage}</div>
        )}

        <div>
          <label htmlFor='first-name'>First name</label>
          <input
            required
            type='text'
            name='first-name'
            id='first-name'
            value={this.state.firstName}
            onChange={e => this.setState({ firstName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor='last-name'>Last name</label>
          <input
            required
            type='text'
            name='last-name'
            id='last-name'
            value={this.state.lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor='username'>Email</label>
          <input
            required
            type='text'
            name='username'
            id='username'
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            required
            type='password'
            name='password'
            id='password'
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </div>

        <div className='form-group'>
          <button>Sign up</button>
        </div>

        <div className='form-group'>
          <Link to='/login' className='login-link'>Already have an account? Login here.</Link>
        </div>
      </form>
    )
  }
}

export default SignupForm;