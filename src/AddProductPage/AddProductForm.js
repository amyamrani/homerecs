import React, { Component } from 'react';
import APIContext from '../APIContext';
import { withRouter } from 'react-router-dom';
import config from '../config';
import './AddProductForm.css';

class AddProductForm extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      url: '',
      comments: '',
      category: '',
    }
  }

  submit = (e) => {
    e.preventDefault();
    this.setState({errorMessage: undefined})

    const newProduct = {
      name: this.state.name,
      url: this.state.url,
      comments: this.state.comments,
      category: this.state.category,
    };

    const authToken = localStorage.getItem('authToken')

    fetch(`${config.API_BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(newProduct)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            this.setState({errorMessage: error.error.message})
          })
        } else {
          this.props.history.push('/dashboard');
        }
      })
      .catch(err => {
        this.setState({errorMessage: 'Please try again.'})
      });
  }

  render() {
    return (
      <form className='product-form' onSubmit={this.submit}>
        <div className='form-section'>
          <label htmlFor='product-category'>Category:</label>
          <select
            required
            id='category'
            value={this.state.category}
            onChange={(e) => this.setState({ category: e.target.value })}
          >
            <option value=''>Select</option>
            <option value='Living Room'>Living Room</option>
            <option value='Dining Room'>Dining Room</option>
            <option value='Kitchen'>Kitchen</option>
            <option value='Bedroom'>Bedroom</option>
            <option value='Bathroom'>Bathroom</option>
            <option value='Laundry Room'>Laundry Room</option>
            <option value='Outdoor/Patio'>Outdoor/Patio</option>
            <option value='Garage'>Garage</option>
          </select>
        </div>

        <div className='form-section'>
          <label htmlFor='product-name'>Product Name:</label>
          <input
            required
            type='text'
            name='name'
            onChange={(e) => this.setState({ name: e.target.value })}
            value={this.state.name}
          />
        </div>

        <div className='form-section'>
          <label htmlFor='link'>Link:</label>
          <input
            required
            type='url'
            name='link'
            placeholder='Enter URL'
            onChange={(e) => this.setState({ url: e.target.value })}
            value={this.state.url}
          />
        </div>

        <div className='form-section'>
          <label htmlFor='days'>Comments:</label>
          <input
            required
            className='comment-input'
            type='text'
            name='comment'
            onChange={(e) => this.setState({ comments: e.target.value })}
            value={this.state.comments}
          />
        </div>

        <button onClick={() => this.props.history.push('/dashboard')} type='button'>Cancel</button>
        <button type='submit'>Save</button>
      </form>
    );
  }
}

export default withRouter(AddProductForm);
