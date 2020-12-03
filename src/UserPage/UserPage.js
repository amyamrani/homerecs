import React, { Component } from 'react';
import Product from '../Product/Product';

class UserPage extends Component {
  render() {
    const { user, products } = this.props;

    return (
      <div className='page-container'>

        <section>
          <h1 className='section-title'>{user.name}</h1>
        </section>

        <section>
          <h2>Product Recommendations</h2>

          {products.map(product => (
            <div key={product.id}>
              <Product product={product} />
              <hr />
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default UserPage;