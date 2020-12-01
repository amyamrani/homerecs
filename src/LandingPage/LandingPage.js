import React, { Component } from 'react';
import SignupForm from '../SignupForm/SignupForm';
import './LandingPage.css';

class LandingPage extends Component {
  render() {
    return (
      <div className='page-container'>

        <section>
          <div className='landing-section-content'>
            <h1 className='section-title'>HomeRecs</h1>
            <div>
              *placeholder for screenshot*
            </div>
          </div>
        </section>

        <section>
          <div className='landing-section-content'>
            <h2 className='section-title'>About HomeRecs</h2>
            <p>Have you ever read a review and questioned if you can trust it?</p>
            <p>HomeRecs connects friends and family to share the products they love so you can feel confident about the products you buy.</p>
          </div>
        </section>

        <section>
          <div className='landing-section-content'>
            <h2 className='section-title'>Get Started</h2>
            <p>Create a new group or join an existing group</p>
            <div>
              *placeholder for screenshot*
            </div>
            <p>View product recommendations from your friends and family</p>
          </div>
        </section>

        <section>
          <div className='landing-section-content'>
            <h2 className='section-title'>Add & Manage Your Product Recommendations</h2>
            <p>Simpy select a category, enter the product name along with a link and comment if you choose</p>
            <p>And easily update your product if you need</p>
            <div>
              *placeholder for screenshot*
            </div>
          </div>
        </section>

        <section>
          <div className='landing-section-content'>
            <h2 className='section-title'>Join Today!</h2>

            <SignupForm />

            <p>Or try the
              <a href='http://www.google.com' className='signup-login-links'>DEMO</a>
              first!
            </p>
          </div>
        </section>

      </div>
    )
  }
}

export default LandingPage;