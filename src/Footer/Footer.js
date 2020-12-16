import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        &copy; HomeRecs {(new Date().getFullYear())}. All rights reserved.
      </footer>
    );
  }
}

export default Footer;