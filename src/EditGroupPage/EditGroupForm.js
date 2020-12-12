import React, { Component } from 'react';
import APIContext from '../APIContext';
import { withRouter } from 'react-router-dom';
import config from '../config';
import '../AddGroupPage/GroupForm.css';

class EditGroupForm extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props);

    this.state = {
      name: props.group.name || '',
    }
  }

  submit = (e) => {
    e.preventDefault();
    this.setState({errorMessage: undefined})

    const updatedGroup = {
      name: this.state.name,
    };

    const authToken = localStorage.getItem('authToken')

    fetch(`${config.API_BASE_URL}/api/groups/${this.props.group.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(updatedGroup)
    })
      .then(res => {
        if (res.ok) {
          this.props.history.push(`/groups/${this.props.group.id}`);
        } else {
          return res.json().then(error => {
            this.setState({errorMessage: error.error.message})
          })
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
            required
            type='text'
            name='group-name'
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
          />
        </div>

        <button onClick={() => this.props.history.push(`/groups/${this.props.group.id}`)} type='button'>Cancel</button>
        <button type='submit'>Update</button>
      </form>
    );
  }
}

export default withRouter(EditGroupForm);