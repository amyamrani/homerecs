import React, { Component } from 'react';
import AddProductForm from '../AddProductForm/AddProductForm';

class AddProductPage extends Component {
  render() {
    return (
      <div className='page-container'>

      <section>
          <h1 className='section-title'>Add New Product</h1>
      </section>

      <AddProductForm />

      </div>
    );
  }
}

export default AddProductPage;