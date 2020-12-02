import React, { Component } from 'react';
import EditProductForm from './EditProductForm';

class EditProductPage extends Component {
  render() {
    return (
      <div className='page-container'>

      <section>
        <h1 className='section-title'>Edit Product</h1>
      </section>

      <EditProductForm product={this.props.product} />

      </div>
    );
  }
}

export default EditProductPage;