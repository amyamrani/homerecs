import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import APIContext from '../APIContext';
import config from '../config';
import './LoginForm.css';

class LoginForm extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    }
  }

  handleLogin = (e) => {
    fetch(`${config.API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })
      .then((res) => {
        return !res.ok
          ? res.json().then((e) => Promise.reject(e))
          : res.json();
      })
      .then(res => {
        this.context.login(res)
      })
      .catch(err => {
        this.setState({errorMessage: 'Incorrect email and/or password.'})
      });

    e.preventDefault();
  }

  render() {
    if (this.context.isLoggedIn === true) {
      return <Redirect to='/dashboard' />
    }

    return (
      <form className='signup-form' onSubmit={this.handleLogin}>
        {this.state.errorMessage && (
          <div className='login-error-message'>{this.state.errorMessage}</div>
        )}

        <div>
          <label htmlFor='username'>Email</label>
          <input
            required
            type='email'
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
          <button>Login</button>
        </div>

        <div>
          <Link to='/signup' className='signup-link'>Don't have an account? Sign up here.</Link>
        </div>

        <div className='demo-container'>
          <div className='demo-label'>
            Demo User Credentials
          </div>

          <div>
            <label className='demo-credentials-label'>Email:</label> demo@user.com
          </div>

          <div>
            <label className='demo-credentials-label'>Password:</label> Password123
          </div>
        </div>
      </form>
    )
  }
}

export default LoginForm;