import React, { Component } from 'react';
import './Dashboard.css';
import APIContext from '../APIContext';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  static contextType = APIContext;

  render() {
    return (
      <div className='page-container'>

        <section>
          <h1 className='section-title'>Dashboard</h1>
        </section>

        <section>
          <h2 className='section-title'>My Groups</h2>

          <div>
            <Link className='button' to='/groups/new'>Create a New Group</Link>
          </div>

          <hr />

          {this.context.groups.map(group => (
            <div key={group.id}>
              <h3>
                {group.name} - {group.code}
              </h3>

              <div>
                <Link className='button' to={`/groups/${group.id}/edit`}>Edit</Link>
                <button onClick={() => this.context.deleteGroup(group.id)} type='button'>Delete</button>
              </div>

              <hr />
            </div>
          ))}
        </section>


        <section>
          <h2 className='section-title'>My Products</h2>

          <div>
            <Link className='button' to='/products/new'>Add New Product</Link>
          </div>

          <hr />

          {this.context.products.map(product => (
            <div key={product.id}>
              <p className='category-type'>Category: {product.category}</p>

              <h3>
                <a href={product.url}>{product.name}</a>
              </h3>

              <p>{product.comments}</p>

              <div>
                <Link className='button' to={`/products/${product.id}/edit`}>Edit</Link>
                <button onClick={() => this.context.deleteProduct(product.id)} type='button'>Delete</button>
              </div>

              <hr />
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default Dashboard;