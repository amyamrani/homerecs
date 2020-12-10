import React, { Component } from 'react';
import APIContext from '../APIContext';
import { withRouter } from 'react-router-dom';
import config from '../config';
import './GroupForm.css';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class AddGroupForm extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props);

    this.state = {
      name: '',
    }
  }

  submit = (e) => {
    e.preventDefault();
    this.setState({errorMessage: undefined})

    const newGroup = {
      name: this.state.name,
    };

    const authToken = localStorage.getItem('authToken')

    fetch(`${config.API_BASE_URL}/api/groups`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(newGroup)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            this.setState({errorMessage: error.error.message})
          })
        } else {
          this.props.history.push('/dashboard');
        }
      })
      .catch(err => {
        this.setState({errorMessage: 'Please try again.'})
      });
  }

  render() {
    return (
      <form className='group-form' onSubmit={this.submit}>
        <div className='form-section'>
          <label htmlFor='group-name'>Group Name:</label>
          <input
            type='text'
            name='group-name'
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
          />
        </div>

        <button onClick={() => this.props.history.push('/dashboard')} type='button'>Cancel</button>
        <button type='submit'>Save</button>
      </form>
    );
  }
}

export default withRouter(AddGroupForm);