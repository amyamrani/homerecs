import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

class GroupPage extends Component {
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


  render() {
    const { group, users } = this.state;
    const currentUser = JSON.parse(localStorage.getItem('user'))

    return (
      <div className='page-container'>

        <section>
          <h1 className='section-title'>{group.name}</h1>

          <p>Invite code: {group.code}</p>

          <div>
            <Link className='button' to={`/groups/${group.id}/edit`}>Edit</Link>
          </div>
          <div>
            <button className='button' onClick={() => this.context.deleteGroup(group.id)} type='button'>Leave Group</button>
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

export default GroupPage;