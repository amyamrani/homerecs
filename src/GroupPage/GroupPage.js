import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import APIContext from '../APIContext';
import config from '../config';
import { withRouter } from 'react-router-dom';
import LoadingPage from '../LoadingPage/LoadingPage';
import './GroupPage.css';

class GroupPage extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      group: {},
      error: undefined,
      isLoadingGroup: true,
      isLoadingUsers: true,
    }
  };

  componentDidMount () {
    this.getGroup();
    this.getUsers();
  }

  getGroup = () => {
    this.setState({ isLoadingGroup: true });

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
      .finally(() => this.setState({ isLoadingGroup: false }))
  };

  getUsers = () => {
    this.setState({ isLoadingUsers: true });

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
      .finally(() => this.setState({ isLoadingUsers: false }))
  };

  leaveGroup = () => {
    const updatedUser = {
      group_id: null,
    }

    // get the current user's id from localStorage
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

    if (this.state.isLoadingGroup || this.state.isLoadingUsers) {
      return <LoadingPage />;
    }

    return (
      <div className='page-container'>

        <div className='page-header'>
          <div className='page-section'>
            <div className='page-title'>
              <h1>{group.name}</h1>

              <div>
                <Link className='button button-primary' to={`/groups/${group.id}/edit`}>Edit</Link>
                <button className='button' onClick={this.leaveGroup} type='button'>Leave Group</button>
              </div>
            </div>

            {this.state.group && (
              <div className='current-group'>
                <div className='current-group-label'>
                  Invite code:
                </div>
                <div className='bubble'>{group.code}</div>
              </div>
            )}
          </div>
        </div>

        <div>

          <div className='page-section'>
            <div className='page-subtitle'>
              <h2>Group Members</h2>
            </div>

            <div className='user-boxes'>
              {users.filter(user => user.id !== currentUser.id).map(user => (
                <div key={user.id} className='user-box'>
                  <div className='user-box-initials'>
                    {user.first_name[0]}{user.last_name[0]}
                  </div>

                  <div className='user-box-details'>
                    <Link className='link' to={`/users/${user.id}`}>
                      {user.first_name} {user.last_name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(GroupPage);