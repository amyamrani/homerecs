import React, { Component } from 'react';
import APIContext from '../APIContext';
import { withRouter } from 'react-router-dom';
import '../AddGroupPage/GroupForm.css';

class EditGroupForm extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props);

    this.state = {
      name: props.group.name || '',
      code: props.group.code || '',
    }
  }

  submit = (e) => {
    e.preventDefault();

    const newGroup = {
      id: this.props.group.id,
      name: this.state.name,
      code: this.state.code,
    };
    this.context.editGroup(newGroup);
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <form className='group-form' onSubmit={this.submit}>
        <div className='form-section'>
          <label htmlFor='product-name'>Group Name:</label>
          <input
            type='text'
            name='group-name'
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
          />
        </div>

        <div className='form-section'>
          <label htmlFor='link'>Group Access Code:</label>
          <input
            type='text'
            name='link'
            placeholder='Enter group code'
            value={this.state.code}
            onChange={(e) => this.setState({code: e.target.value})}
          />
        </div>

        <button onClick={() => this.props.history.push('/dashboard')} type='button'>Cancel</button>
        <button type='submit'>Update</button>
      </form>
    );
  }
}

export default withRouter(EditGroupForm);