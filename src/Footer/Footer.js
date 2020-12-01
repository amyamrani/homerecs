import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        &copy; HomeRecs {(new Date().getFullYear())}
      </footer>
    );
  }
}

export default Footer;