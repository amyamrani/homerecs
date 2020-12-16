import React, { Component } from 'react';

class Product extends Component {
  render() {
    const { product } = this.props;

    return (
      <div>
        <p className='category-type'>Category: {product.category}</p>

        <h3>
          <a href={product.url} target='_blank' rel="noreferrer">{product.name}</a>
        </h3>

        <p>{product.comments}</p>
      </div>
    );
  }
}

export default Product;