import React from 'react';
import './Home.scss';
import LoginForm from './LoginForm';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Elevate Your Personal Brand</h1>
          <p className="tagline">The premium subscription service for entrepreneurs looking to stand out</p>
          <button className="cta-button">Start Your Journey Today</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="feature-section">
        <h2 className="section-title">Why Choose Elevate?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Brand Strategy</h3>
            <p>Get expert guidance to craft a compelling personal brand narrative that resonates with your audience.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Content Framework</h3>
            <p>Access our proven content templates and posting schedules optimized for maximum engagement.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Networking Tools</h3>
            <p>Connect with other ambitious entrepreneurs in our exclusive community and collaboration platform.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <h2 className="section-title">Simple, Transparent Pricing</h2>
        <div className="pricing-options">
          <div className="pricing-card">
            <h3>Monthly Plan</h3>
            <div className="price">$29<span>/month</span></div>
            <ul className="benefits">
              <li>All core features</li>
              <li>Weekly strategy sessions</li>
              <li>Email support</li>
            </ul>
            <button className="pricing-button">Get Started</button>
          </div>
          <div className="pricing-card highlighted">
            <div className="popular-badge">Most Popular</div>
            <h3>Annual Plan</h3>
            <div className="price">$299<span>/year</span></div>
            <p className="savings">Save $49 compared to monthly</p>
            <ul className="benefits">
              <li>All core features</li>
              <li>Bi-weekly 1:1 coaching</li>
              <li>Priority support</li>
              <li>Exclusive masterclasses</li>
            </ul>
            <button className="pricing-button primary">Get Started</button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="form-section">
        <div className="form-container">
          <h2 className="section-title">Ready to Elevate Your Brand?</h2>
          <p className="form-subtitle">Join our waitlist for early access and special offers</p>
          <LoginForm />
        </div>
      </section>
    </div>
  );
};

export default Home;