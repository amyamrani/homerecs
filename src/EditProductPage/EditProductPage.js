import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import APIContext from '../APIContext';
import EditProductForm from './EditProductForm';
import config from '../config';

class EditProductPage extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props);

    this.state = {
      product: undefined,
      error: undefined,
    }
  };

  componentDidMount () {
    this.getProduct(this.props.id);
  }

  getProduct = (id) => {
    const authToken = localStorage.getItem('authToken');

    fetch(`${config.API_BASE_URL}/api/products/${id}`, {
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
        this.setState({ product: res })
      })
      .catch(error => this.setState({ error }))
  };

  render() {
    if (this.context.isLoggedIn === false) {
      return <Redirect to='/' />
    }

    return (
      <div className='page-container'>

        <div>
          <h1 className='section-title'>Edit Product</h1>
        </div>

        {this.state.product && <EditProductForm product={this.state.product} />}
      </div>
    );
  }
}

export default EditProductPage;