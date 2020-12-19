import React, { Component } from 'react';
import APIContext from '../APIContext';
import { withRouter } from 'react-router-dom';
import config from '../config';

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
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.setState({errorMessage: data.error.message})
        } else {
          const user = JSON.parse(localStorage.getItem('user'));
          const newUser = {...user, group_id: data.id}
          localStorage.setItem('user', JSON.stringify(newUser));
          this.props.history.push('/dashboard');
        }
      })
        .catch(err => this.setState({errorMessage: 'Please try again.'}));
  }

  render() {
    return (
      <form className='form' onSubmit={this.submit}>
        <div className='form-group'>
          <label htmlFor='group-name'>Group Name:</label>
          <input
            required
            id='group-name'
            type='text'
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
          />
        </div>

        <div className='form-actions'>
          <button className='button' onClick={() => this.props.history.push('/dashboard')} type='button'>Cancel</button>
          <button className='button button-primary' type='submit'>Save</button>
        </div>
      </form>
    );
  }
}

export default withRouter(AddGroupForm);