import React, { Component } from 'react';
import './Dashboard.css';
import APIContext from '../APIContext';
import Product from '../Product/Product';
import { Link, Redirect } from 'react-router-dom';
import config from '../config';

class Dashboard extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      group: undefined,
      error: undefined,
    }
  };

  componentDidMount () {
    this.getUserProducts();
    this.getUserGroup();
  }

  getUserGroup = () => {
    const authToken = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.group_id) {
      return;
    }

    fetch(`${config.API_BASE_URL}/api/groups/${user.group_id}`, {
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

  getUserProducts = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const authToken = localStorage.getItem('authToken')

    if (!user) {
      return;
    }

    fetch(`${config.API_BASE_URL}/api/products?user_id=${user.id}`, {
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

  deleteProduct = (id) => {
    const authToken = localStorage.getItem('authToken');

    fetch(`${config.API_BASE_URL}/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        } else {
          this.getUserProducts();
        }
      })
      .catch(error => {
        this.setState({ error })
      })
  };

  render() {
    if (this.context.isLoggedIn === false) {
      return <Redirect to='/' />
    }

    return (
      <div className='page-container'>

        <section>
          <h1 className='section-title'>Dashboard</h1>
        </section>

        <section>
          {this.state.group && (
            <div>
              <h2 className='section-title'>My Group</h2>

              <Link to={`/groups/${this.state.group.id}`}>
                {this.state.group.name}
              </Link>
            </div>
          )}

          {!this.state.group && (
            <div>
              <Link className='button' to='/groups/new'>Create a New Group</Link>
              <Link className='button' to='/groups/join'>Join a Group</Link>
            </div>
          )}
        </section>


        <section className='products-container'>
          <h2 className='section-title'>My Products</h2>

          <div>
            <Link className='button' to='/products/new'>Add New Product</Link>
          </div>

          {this.state.products.map(product => (
            <div key={product.id}>
              <div className='product-card'>
                <Product product={product} />

                <div>
                  <Link className='button' to={`/products/${product.id}/edit`}>Edit</Link>
                </div>

                <div>
                  <button className='button' onClick={() => this.deleteProduct(product.id)} type='button'>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default Dashboard;