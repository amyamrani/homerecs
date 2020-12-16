import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import APIContext from '../APIContext';
import config from '../config';
import { withRouter } from 'react-router-dom';

class GroupPage extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      group: {},
      error: undefined,
    }
  };

  componentDidMount () {
    this.getGroup();
    this.getUsers();
  }

  getGroup = () => {
    const authToken = localStorage.getItem('authToken');

    fetch(`${config.API_BASE_URL}/api/groups/${this.props.groupId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then((res) => {
        this.setState({ group: res })
      })
      .catch(error => this.setState({ error }))
  };

  getUsers = () => {
    const authToken = localStorage.getItem('authToken')

    fetch(`${config.API_BASE_URL}/api/users?group_id=${this.props.groupId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then((res) => {
        this.setState({ users: res })
      })
      .catch(error => this.setState({ error }))
  };

  leaveGroup = () => {
    const updatedUser = {
      group_id: null,
    }

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
    const { group, users } = this.state;
    const currentUser = JSON.parse(localStorage.getItem('user'))

    if (this.context.isLoggedIn === false) {
      return <Redirect to='/' />
    }

    return (
      <div className='page-container'>

        <section>
          <h1 className='section-title'>{group.name}</h1>

          <p>Invite code: {group.code}</p>

          <div>
            <Link className='button button-primary' to={`/groups/${group.id}/edit`}>Edit</Link>
          {/* </div>
          <div> */}
            <button className='button' onClick={this.leaveGroup} type='button'>Leave Group</button>
          </div>
        </section>

        <section>
          <h2>Group Users</h2>

          {users.map(user => (
            <div key={user.id}>
              {user.id === currentUser.id && (
                <Link to={'/dashboard'}>
                  {user.first_name} {user.last_name}
                </Link>
              )}

              {user.id !== currentUser.id && (
                <Link to={`/users/${user.id}`}>
                  {user.first_name} {user.last_name}
                </Link>
              )}
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default withRouter(GroupPage);