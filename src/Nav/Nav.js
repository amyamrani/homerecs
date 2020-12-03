import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
  render() {
    return (
      <nav>
        <div className='nav-items'>
          <div className='nav-items__item'>
            <Link to='/'>Home</Link>
          </div>

          <div className='nav-items__item'>
            <Link to='/dashboard'>Dashboard</Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;