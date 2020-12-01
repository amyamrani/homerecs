import React, { Component } from 'react';
import './AddProductForm.css';

class AddProductForm extends Component {
  render() {
    return (
      <form className="product-form">
        <div className="form-section">
          <label htmlFor="product-title">Category:</label>
          <select>
            <option>Select One</option>
            <option>Kitchen</option>
            <option>Dining Room</option>
            <option>Living Room</option>
            <option>Bedroom</option>
          </select>
        </div>

        <div className="form-section">
          <label htmlFor="product-name">Product Name:</label>
          <input type="text" name="-product-name" />
        </div>

        <div className="form-section">
          <label htmlFor="link">Link:</label>
          <input type="text" name="link" placeholder="Enter URL" />
        </div>

        <div className="form-section">
          <label htmlFor="days">Comments:</label>
          <input className="comment-input" type="text" name="comment" />
        </div>

        <button type="reset">Reset</button>
        <button type="submit">Save</button>
      </form>
    );
  }
}

export default AddProductForm;