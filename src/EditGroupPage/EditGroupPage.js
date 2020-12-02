import React, { Component } from 'react';
import GroupForm from './EditGroupForm';

class EditGroupPage extends Component {
  render() {
    const { group } = this.props;

    return (
      <div className='page-container'>

        <section>
          <h1 className='section-title'>Edit Group</h1>
        </section>

        <GroupForm group={group} />
      </div>
    );
  }
}

export default EditGroupPage;