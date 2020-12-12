import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import APIContext from '../APIContext';
import JoinGroupForm from './JoinGroupForm';

class JoinGroupPage extends Component {
  static contextType = APIContext;

  render() {
    if (this.context.isLoggedIn === false) {
      return <Redirect to='/' />
    }

    return (
      <div className='page-container'>

        <section>
          <h1 className='section-title'>Join a Group</h1>
        </section>

        <JoinGroupForm />

      </div>
    );
  }
}

export default JoinGroupPage;