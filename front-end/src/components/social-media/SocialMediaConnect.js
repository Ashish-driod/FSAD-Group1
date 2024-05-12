import React, { useState, useEffect } from 'react';
import 'App.css';

const SocialMediaConnect = () => {

    useEffect(() => {
        // Asynchronously load and initialize Facebook SDK
        const loadFacebookSDK = () => {
            window.fbAsyncInit = function() {
                window.FB.init({
                    appId: 'YOUR_FACEBOOK_APP_ID',
                    cookie: true,
                    xfbml: true,
                    version: 'v13.0'
                });
            };

            // Load the SDK asynchronously
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk.js';
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        };

        // Call the function to load SDK when component mounts
        loadFacebookSDK();
    }, []);

    const handleConnectFacebook = () => {
        // Check if FB SDK is initialized before calling FB.login()
        if (window.FB) {
            window.FB.getLoginStatus((response) => {
                if (response.status === 'connected') {
                    console.log('User is already logged in:', response.authResponse);
                    // Handle the authenticated user
                } else {
                    // Call FB.login() once SDK is initialized
                    window.FB.login((loginResponse) => {
                        if (loginResponse.authResponse) {
                            console.log('Facebook login successful:', loginResponse.authResponse);
                            // Handle the authenticated user
                        } else {
                            console.log('Facebook login failed:', loginResponse.status);
                        }
                    }, { scope: 'email' });
                }
            });
        } else {
            console.error('Facebook SDK not initialized.');
        }
    };
    

    const handleConnectTwitter = () => {
        // Implement Twitter OAuth authentication logic
    };

    const handleConnectGoogle = () => {
        // Implement Google OAuth2 authentication logic
    };

    return (
        <div>
            <div className="social-media-container" style={{ border: '2px solid black', padding: '20px' }}>
                <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '20px' }}>
                    Connect with Social Media
                </h2>
               
            </div>
            <button onClick={handleConnectFacebook}>Connect with Facebook</button>
            <button onClick={handleConnectTwitter}>Connect with Twitter</button>
            <button onClick={handleConnectGoogle}>Connect with Google</button>
        </div>
    );
};

export default SocialMediaConnect;
