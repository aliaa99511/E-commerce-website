import React from "react";
// import amazonPayLogo from '../../assets/images/Amazon Pay Logo.png';
// import americanExpressLogo from '../../assets/images/American Express Logo.jpg';
// import mastercardLogo from '../../assets/images/MasterCard Logo.png';
// import paypalLogo from '../../assets/images/PayPal Logo.png';
// import appStoreLogo from '../../assets/images/App Store Badge.png';
// import googlePlayLogo from '../../assets/images/Google Play Badge.png';

// import '../../Style/Footer.scss';
import '../../Style/Footer.css';


const Footer = () => {
    return (
        <div className="footer">
            <div className="app-link">
                <h2>Get the FreshCart app</h2>
                <p>We will send you a link, open it on your phone to download the app.</p>
                <div className="email-input">
                    <input type="email" placeholder="Email .." />
                    <button className="share-button">Share App Link</button>
                </div>
            </div>
            <div className="payment-partners">
                <h3>Payment Partners</h3>
                <div className="partners">
                    <img src="amazon-pay.png" alt="Amazon Pay" />
                    <img src="american-express.png" alt="American Express" />
                    <img src="mastercard.png" alt="MasterCard" />
                    <img src="paypal.png" alt="PayPal" />
                </div>
            </div>
            <div className="app-download">
                <h3>Get deliveries with FreshCart</h3>
                <div className="download-links">
                    <img src="app-store.png" alt="App Store" />
                    <img src="google-play.png" alt="Google Play" />
                </div>
            </div>
        </div>
    );
};

export default Footer;
