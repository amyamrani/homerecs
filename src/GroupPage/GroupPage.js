import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext';

class GroupPage extends Component {
  static contextType = APIContext;

  render() {
    const { group, users } = this.props;

    return (
      <div className='page-container'>

        <section>
          <h1 className='section-title'>{group.name}</h1>

          <p>Access code: {group.code}</p>

          <div>
            <Link className='button' to={`/groups/${group.id}/edit`}>Edit</Link>
          </div>
          <div>
            <button className='button' onClick={() => this.context.deleteGroup(group.id)} type='button'>Delete</button>
          </div>
        </section>

        <section>
          <h2>Group Users</h2>
          {users.map(user => (
            <div key={user.id}>
              <Link to={`/users/${user.id}`}>
                {user.name}
              </Link>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default GroupPage;