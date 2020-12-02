import React, { Component } from 'react';
import GroupForm from './AddGroupForm';

class AddGroupPage extends Component {
  render() {
    return (
      <div className='page-container'>

      <section>
        <h1 className='section-title'>Add New Group</h1>
      </section>

      <GroupForm />

      </div>
    );
  }
}

export default AddGroupPage;