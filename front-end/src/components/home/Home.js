import React, { useState, useEffect } from 'react';
import 'App.css';
import imagebase2 from 'assets/Collage.jpg';





const Home = () => (
    <div>
      {/*  <h1  className="text-3xl font-bold background-image align-items: center">Home</h1>*/}
      {/*  <p style={{ color: 'red' }} className="font-bold text-2xl">Welcome to the dashboard!!!</p>*/}
      {/*  <img src={imagebase2} alt="Fitness Tracker" />*/}
      {/*<Footer />*/}
    </div>
);

// Footer component
function Footer() {
    return (
      <footer>
        <ul>
        <li><a href="#" className="footer-link">About Us</a></li>
        <li><a href="#" className="footer-link">Contact Us</a></li>
        <li><a href="#" className="footer-link">Privacy Policy</a></li>
        </ul>
      </footer>
    );
  }

export default Home;
