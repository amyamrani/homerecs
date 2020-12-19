import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Nav.css';
import APIContext from '../APIContext';

class Nav extends Component {
  static contextType = APIContext;

  render() {
    return (
      <nav className={`nav ${this.props.location.pathname === '/' ? '' : 'nav-dark'}`}>
        <div>
          <Link to='/' className='logo-icon'>
            <svg className='' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
            </svg>
            <svg className='' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' />
            </svg>
          </Link>
        </div>

        <div>
          {this.context.isLoggedIn && (
            <div>
              <Link to='/dashboard' className='button button-secondary'>Dashboard</Link>

              <button
                  className='button'
                  onClick={this.context.logout}
                >
                  Logout
              </button>
            </div>
          )}


          {!this.context.isLoggedIn && (
            <div>
              <Link to='/login' className='button'>
                Login
              </Link>

              <Link to='/signup' className='button button-primary'>
                Sign up
              </Link>
            </div>
          )}
        </div>

      </nav>
    );
  }
}

export default withRouter(Nav);
