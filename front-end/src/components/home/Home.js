import React, { useState, useEffect } from 'react';
import 'App.css';
import imagebase2 from 'assets/Collage.jpg';





const Home = () => {

    const steps = 5000;
    const caloriesBurnt = 300;
    const heartRate = 80;

    const data = {
        steps: 5000,
        caloriesBurnt: 300,
        heartRate: 80
    };

    return (

        <div className="dashboard-container">
            Good Job! Every Step counts ! Let's have look at your today's effort :
            <br/><br/>
            <div className="section-container">
                <div className="section">
                    <h2>Steps</h2>
                    <p>{steps}</p>
                </div>
                <div className="section">
                    <h2>Calories Burnt</h2>
                    <p>{caloriesBurnt}</p>
                </div>
                <div className="section">
                    <h2>Heart Rate</h2>
                    <p>{heartRate}</p>
                </div>
            </div>
        </div>

    );
}

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
