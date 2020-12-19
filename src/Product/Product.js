import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

class Product extends Component {
  render() {
    const { product, onDelete, editUrl } = this.props;

    return (
      <div className='product'>
        <div className='product-body'>
          <div className='product-title'>
            <a className='link-xl' href={product.url} target='_blank' rel='noreferrer'>{product.name}</a>
            <span className='bubble'>{product.category}</span>
          </div>

          <div className='product-comments'>
            {product.comments}
          </div>
        </div>

        {onDelete && (
          <div className='product-buttons'>
            <Link className='button button-primary' to={editUrl}>Edit</Link>
            <button className='button' onClick={onDelete} type='button'>Delete</button>
          </div>
        )}
      </div>
    );
  }
}

export default Product;