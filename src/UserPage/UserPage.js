import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import APIContext from '../APIContext';
import Product from '../Product/Product';
import config from '../config';

class UserPage extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      user: undefined,
      error: undefined,
    }
  };

  componentDidMount () {
    this.getUser();
  }

  getUser = () => {
    const authToken = localStorage.getItem('authToken');

    fetch(`${config.API_BASE_URL}/api/users/${this.props.userId}`, {
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
        this.setState({ user: res })
        this.getUserProducts();
      })
      .catch(error => this.setState({ error }))
  };

  getUserProducts = () => {
    const authToken = localStorage.getItem('authToken')

    fetch(`${config.API_BASE_URL}/api/products?user_id=${this.state.user.id}`, {
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
        this.setState({ products: res })
      })
      .catch(error => this.setState({ error }))
  };

  render() {
    if (this.context.isLoggedIn === false) {
      return <Redirect to='/' />
    }

    const { user, products } = this.state;

    return (
      <div className='page-container'>
        <div className='page-header'>
          <div className='page-section'>
            <div className='page-title'>
              {user && (
                <h1>{user.first_name} {user.last_name}</h1>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className='page-section'>
            <div className='page-subtitle'>
              <h2>Home Recommendations</h2>
            </div>

            {products && (
              <div className='product-list'>
                {products.map(product => (
                  <div key={product.id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;