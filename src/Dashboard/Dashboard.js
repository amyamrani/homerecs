import React, { Component } from 'react';
import './Dashboard.css';
import APIContext from '../APIContext';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import config from '../config';

class Dashboard extends Component {
  static contextType = APIContext;

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      error: undefined,
    }
  };

  componentDidMount () {
    this.getUserProducts();
  }

  getUserProducts = () => {
    const id = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken');

    fetch(`${config.API_BASE_URL}/api/products?user_id=${id}`, {
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
    return (
      <div className='page-container'>

        <section>
          <h1 className='section-title'>Dashboard</h1>
        </section>

        <section>
          <h2 className='section-title'>My Groups</h2>

          {this.context.groups.map(group => (
            <div key={group.id}>
              <div>
                <Link to={`/groups/${group.id}`}>
                  {group.name}
                </Link>
              </div>
            </div>
          ))}

          <div>
            <Link className='button' to='/groups/new'>Create a New Group</Link>
          </div>
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