import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import APIContext from '../APIContext';
import EditGroupForm from './EditGroupForm';
import config from '../config';

class EditGroupPage extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props);

    this.state = {
      group: undefined,
      error: undefined,
    }
  };

  componentDidMount () {
    this.getGroup();
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

  render() {
    if (this.context.isLoggedIn === false) {
      return <Redirect to='/' />
    }

    const { group } = this.state;

    return (
      <div className='page-container'>

        <section>
          <h1 className='section-title'>Edit Group</h1>
        </section>

        {group && <EditGroupForm group={group} />}
      </div>
    );
  }
}

export default EditGroupPage;