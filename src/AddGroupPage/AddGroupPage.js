import React, { Component } from 'react';
import GroupForm from './AddGroupForm';

class AddGroupPage extends Component {
  render() {
    return (
      <div className='page-container'>

      <div>
        <h1 className='section-title'>Create Group</h1>
      </div>

      <GroupForm />

      </div>
    );
  }
}

export default AddGroupPage;