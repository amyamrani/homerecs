import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import LandingPage from '../LandingPage/LandingPage';
import Footer from '../Footer/Footer';
import './App.css';


class App extends Component {
  render() {
    return (
      <main className='app'>
        <Nav/>
        <LandingPage />
        <Footer />
      </main>
    );
  }
}

export default App;