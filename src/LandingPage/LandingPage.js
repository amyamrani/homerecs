import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext';
import './LandingPage.css';

class LandingPage extends Component {
  static contextType = APIContext;

  render() {
    return (
      <div className='page-container'>
        <div className='hero'>
          <div className='hero-title'>
            Home<span className='hero-title-color'>Recs</span>
          </div>
          <div className='hero-subtitle'>
            Connect with friends and family to share the products you love so everyone can feel confident about the products they buy.
          </div>

          <div className='hero-buttons'>
            {!this.context.isLoggedIn && (
              <div>
                <Link className='button button-primary button-xl' to='/signup'>
                  Get Started
                </Link>

                <Link to='/login' className='button button-xl'>
                  Live Demo
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className='featured-section'>
          <div className='featured-section-box'>
            <div className='featured-section-box-half'>
              <div className='featured-section-content'>
                <div className='featured-section-title'>
                  Connecting With Groups
                </div>

                <div className='info-item'>
                  <div className='info-item-icon'>
                    <div className='icon-block'>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                    </div>
                  </div>

                  <div className='info-item-text'>
                    Create a new group and invite your friends and family to join using the code provided.
                  </div>
                </div>

                <div className='info-item'>
                  <div className='info-item-icon'>
                    <div className='icon-block'>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                      </svg>
                    </div>
                  </div>

                  <div className='info-item-text'>
                    Join an existing group to see product recommendations from each member.
                  </div>
                </div>
              </div>
            </div>
            <div className='featured-section-box-half'>
              <div className='featured-section-image'>
                <img src='' alt='App screenshot' />
              </div>
            </div>
          </div>
        </div>

        <div className='featured-section'>
          <div className='featured-section-box'>
            <div className='featured-section-box-half'>
              <div className='featured-section-image'>
                <img src='' alt='App screenshot' />
              </div>
            </div>

            <div className='featured-section-box-half'>
              <div className='featured-section-content'>
                <div className='featured-section-title'>
                  Sharing Your Home Recs
                </div>

                <div className='info-item'>
                  <div className='info-item-icon'>
                    <div className='icon-block'>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z' />
                      </svg>
                    </div>
                  </div>

                  <div className='info-item-text'>
                    To add a new product recommendation, simply select a category from the list and enter the product name, website url and comment.
                  </div>
                </div>

                <div className='info-item'>
                  <div className='info-item-icon'>
                  <div className='icon-block'>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                      </svg>
                    </div>
                  </div>

                  <div className='info-item-text'>
                    Manage your recommendations when you upgrade products in your home.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage;