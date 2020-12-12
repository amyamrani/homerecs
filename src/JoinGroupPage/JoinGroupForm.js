import React, { Component } from 'react';
import APIContext from '../APIContext';
import { withRouter } from 'react-router-dom';
import config from '../config';

class JoinGroupForm extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props);

    this.state = {
      code: '',
    }
  }

  join = (e) => {
    e.preventDefault();
    const updatedUser = { code: this.state.code }

    const authToken = localStorage.getItem('authToken')
    const user = JSON.parse(localStorage.getItem('user'))

    fetch(`${config.API_BASE_URL}/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(updatedUser)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data => {
      if (data.error) {
        this.setState({errorMessage: data.error.message})
      } else {
        localStorage.setItem('user', JSON.stringify(data))
        this.props.history.push('/dashboard');
      }
    })
    .catch(err => {
      this.setState({errorMessage: 'Please try again.'})
    });
  }

  render() {
    return (
      <form className='group-form' onSubmit={this.join}>
        <div className='form-section'>
          <label htmlFor='group-name'>Group Code:</label>
          <input
            type='text'
            name='code'
            value={this.state.code}
            onChange={(e) => this.setState({code: e.target.value})}
          />
        </div>

        <button onClick={() => this.props.history.push('/dashboard')} type='button'>Cancel</button>
        <button type='submit'>Save</button>
      </form>
    );
  }
}

export default withRouter(JoinGroupForm);