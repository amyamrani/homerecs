import React, { Component } from 'react';
import './Dashboard.css';
import APIContext from '../APIContext';
import Product from '../Product/Product';
import LoadingPage from '../LoadingPage/LoadingPage';
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
      isLoadingGroup: true,
      isLoadingProducts: true,
    }
  };

  componentDidMount () {
    this.getUserProducts();
    this.getUserGroup();
  }

  getUserGroup = () => {
    this.setState({ isLoadingGroup: true });

    const authToken = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.group_id) {
      this.setState({ group: null, isLoadingGroup: false })
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
      .finally(() => this.setState({ isLoadingGroup: false }))
  };

  getUserProducts = () => {
    this.setState({ isLoadingProducts: true });

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
      .finally(() => this.setState({ isLoadingProducts: false }))
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

    // wait to render the dashboard until both group and products are ready
    if (this.state.isLoadingGroup || this.state.isLoadingProducts) {
      return <LoadingPage />;
    }

    return (
      <div className='page-container'>

        <div className='page-header'>
          <div className='page-section'>
            <div className='page-title'>
              <h1>Dashboard</h1>

              {this.state.group === null && (
                <div>
                  <Link className='button button-primary' to='/groups/new'>Create Group</Link>
                  <Link className='button' to='/groups/join'>Join Group</Link>
                </div>
              )}
            </div>

            {this.state.group && (
              <div className='current-group'>
                <span className='current-group-label'>My Group: </span>

                <div>
                  <Link className='link-xl' to={`/groups/${this.state.group.id}`}>
                    {this.state.group.name}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='page-section'>
          <div className='page-subtitle'>
            <h2>My Products</h2>

            <div className='page-subtitle-buttons'>
              <Link className='button button-primary' to='/products/new'>
                <svg className='icon' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                </svg>
              </Link>
            </div>
          </div>

          <div className='product-list'>
            {this.state.products.map(product => (
              <div key={product.id}>
                <Product
                  product={product}
                  onDelete={() => this.deleteProduct(product.id)}
                  editUrl={`/products/${product.id}/edit`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;