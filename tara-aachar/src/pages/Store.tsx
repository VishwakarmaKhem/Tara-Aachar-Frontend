import { Link } from 'react-router-dom';
import './Store.css';

const Store = () => {
  const products = [
    {
      id: 1,
      name: "Mango Aachar",
      description: "Sweet & spicy traditional mango pickle made with fresh raw mangoes and authentic spices",
      price: "₹250",
      image: "🥭",
      features: ["Sweet & Spicy", "Traditional Recipe", "Fresh Mangoes"],
      weight: "500g"
    },
    {
      id: 2,
      name: "Mixed Vegetable Pickle",
      description: "A delightful mix of seasonal vegetables pickled to perfection with aromatic spices",
      price: "₹150",
      image: "🥕",
      features: ["Seasonal Vegetables", "Aromatic Spices", "Healthy Mix"],
      weight: "500g"
    },
    {
      id: 3,
      name: "Lemon Pickle",
      description: "Tangy and zesty lemon pickle prepared in traditional style with mustard oil",
      price: "₹200",
      image: "🍋",
      features: ["Tangy & Zesty", "Mustard Oil", "Traditional Style"],
      weight: "400g"
    },
    {
      id: 4,
      name: "Garlic Pickle",
      description: "Extra spicy garlic pickle for those who love intense flavors and heat",
      price: "₹130",
      image: "🧄",
      features: ["Extra Spicy", "Intense Flavor", "Premium Garlic"],
      weight: "400g"
    },
    {
      id: 5,
      name: "Carrot & Turnip Pickle",
      description: "Crunchy and flavorful pickle made with fresh carrots and turnips",
      price: "₹110",
      image: "🥕",
      features: ["Crunchy Texture", "Fresh Vegetables", "Mild Spice"],
      weight: "500g"
    },
    {
      id: 6,
      name: "Green Chili Pickle",
      description: "Fiery hot green chili pickle for spice lovers who want maximum heat",
      price: "₹250",
      image: "🌶️",
      features: ["Fiery Hot", "Maximum Heat", "Spice Lovers"],
      weight: "300g"
    }
  ];

  return (
    <div className="store">
      <div className="store-container">
        <div className="store-header">
          <h1>🥒 Our Pickle Store 🥒</h1>
          <p className="store-subtitle">
            Discover our authentic collection of homemade pickles, each crafted with love and traditional recipes
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <span className="product-emoji">{product.image}</span>
                <div className="product-badge">
                  <span>Homemade</span>
                </div>
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-features">
                  {product.features.map((feature, index) => (
                    <span key={index} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="product-details">
                  <div className="product-weight">
                    <span>Weight: {product.weight}</span>
                  </div>
                  <div className="product-price">
                    <span className="price">{product.price}</span>
                    <span className="price-unit">per jar</span>
                  </div>
                </div>
                
                <Link 
                  to="/contact" 
                  state={{ product: product }}
                  className="buy-now-btn"
                >
                  🛒 Buy Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="store-footer">
          <div className="delivery-info">
            <h3>🚚 Delivery Information</h3>
            <div className="delivery-details">
              <p>✅ Free delivery within 5km radius</p>
              <p>✅ ₹50 delivery charge for longer distances</p>
              <p>✅ Fresh pickles delivered within 24 hours</p>
              <p>✅ Secure packaging to maintain freshness</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;