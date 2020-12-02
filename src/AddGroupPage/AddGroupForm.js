import React, { Component } from 'react';
import APIContext from '../APIContext';
import { withRouter } from 'react-router-dom';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class AddGroupForm extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      code: '',
    }
  }

  submit = (e) => {
    e.preventDefault();

    const newGroup = {
      id: getRandomInt(1000),
      name: this.state.name,
      code: this.state.code,
    };
    this.context.addGroup(newGroup);
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
        <button type='submit'>Save</button>
      </form>
    );
  }
}

export default withRouter(AddGroupForm);