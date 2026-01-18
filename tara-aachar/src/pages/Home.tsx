import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home-content">
        <h1>🥒 Welcome to Tara Aachar 🥒</h1>
        <p className="subtitle">Authentic Homemade Pickles & Traditional Aachar</p>
        
        <div className="hero-section">
          <p className="hero-text">
            Experience the authentic taste of traditional Indian pickles made with love, 
            fresh ingredients, and time-honored recipes passed down through generations. 
            From tangy mango aachar to spicy mixed vegetable pickles, we bring you the 
            finest homemade preserves that add flavor to every meal.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🌶️</span>
              <h3>Spicy & Tangy</h3>
              <p>Perfect blend of spices</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🥭</span>
              <h3>Fresh Ingredients</h3>
              <p>Made with premium quality fruits & vegetables</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">👵</span>
              <h3>Traditional Recipe</h3>
              <p>Authentic family recipes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;