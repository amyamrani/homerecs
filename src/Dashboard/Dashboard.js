import React, { Component } from 'react';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="page-container">

        <section>
          <h1 className="section-title">Dashboard</h1>
          <div>
            <button type="button">Create a New Group</button>
            <button type="button">Join an Existing Group</button>
          </div>
        </section>

        <section>
          <h1 className="section-title">My Products</h1>
          <div>
            <button type="button">Add New Product</button>
          </div>
        </section>

        <section>
          <p className="category-type">Category: Kitchen</p>
          <h3>
            <a href="https://www.bestbuy.com/site/samsung-28-cu-ft-large-capacity-3-door-french-door-refrigerator-with-autofill-water-pitcher-fingerprint-resistant-stainless-steel/6417768.p?skuId=6417768">Samsung Refridgerator</a>
          </h3>
          <p>28 cu. ft. Large Capacity 3-Door French Door Refrigerator with AutoFill Water Pitcher - Fingerprint Resistant Stainless Steel</p>
          <div>
            <button type="button">Edit</button>
          </div>
        </section>

        <section>
          <p className="category-type">Category: Living Room</p>
          <h3>
            <a href="https://www.bestbuy.com/site/sonos-beam-soundbar-with-voice-control-built-in-black/6253409.p?skuId=6253409"> Sonos TV Soundbar</a>
          </h3>
          <p>Sonos - Beam Soundbar with Voice Control built-in - Black</p>
          <div>
            <button type="button">Edit</button>
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;