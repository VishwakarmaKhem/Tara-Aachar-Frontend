import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="about-content">
        <h1>🥒 Our Story - Tara Aachar 🥒</h1>
        <p>
          Welcome to Tara Aachar, where tradition meets taste! We are passionate about 
          bringing you the most authentic and delicious homemade pickles, crafted with 
          love and the finest ingredients. Our journey began in our grandmother's kitchen, 
          where secret family recipes were passed down through generations.
        </p>
        
        <div className="story-section">
          <h2>Why Choose Tara Aachar?</h2>
          <div className="reasons-grid">
            <div className="reason-card">
              <span className="reason-icon">🌿</span>
              <h3>100% Natural</h3>
              <p>No artificial preservatives or chemicals. Only natural ingredients and traditional methods.</p>
            </div>
            <div className="reason-card">
              <span className="reason-icon">👨‍🍳</span>
              <h3>Handcrafted</h3>
              <p>Each jar is carefully prepared by hand using time-tested family recipes.</p>
            </div>
            <div className="reason-card">
              <span className="reason-icon">🏠</span>
              <h3>Homemade Quality</h3>
              <p>Made in small batches to ensure freshness and authentic taste in every jar.</p>
            </div>
            <div className="reason-card">
              <span className="reason-icon">🌶️</span>
              <h3>Variety of Flavors</h3>
              <p>From mild to extra spicy, we have pickles to suit every palate and preference.</p>
            </div>
          </div>
        </div>
        
        <div className="features">
          <h2>Our Specialties</h2>
          <ul>
            <li>Mango Aachar (Sweet & Spicy)</li>
            <li>Mixed Vegetable Pickle</li>
            <li>Lemon Pickle (Traditional Style)</li>
            <li>Garlic Pickle (Extra Spicy)</li>
            <li>Carrot & Turnip Pickle</li>
            <li>Green Chili Pickle</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;