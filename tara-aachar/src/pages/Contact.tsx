import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Contact.css';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  features: string[];
  weight: string;
}

interface Ingredient {
  name: string;
  quantity: string;
  price: string;
}

interface ProductIngredient {
  name: string;
  ingredients: Ingredient[];
  totalCost: string;
}

interface OrderSummary {
  customerName: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  productName: string;
  productPrice: string;
  quantity: number;
  ingredientOption: string;
  ingredientCost: string;
  pickupAddress?: string;
  pickupDate?: string;
  pickupTime?: string;
  specialInstructions?: string;
  totalAmount: string;
}

const Contact = () => {
  const location = useLocation();
  const selectedProduct = location.state?.product as Product;
  
  const [ingredientOption, setIngredientOption] = useState('buy');
  const [showPickupAddress, setShowPickupAddress] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);

  // Ingredient data for each product
  const productIngredients: Record<number, ProductIngredient> = {
    1: { // Mango Aachar
      name: "Mango Aachar",
      ingredients: [
        { name: "Raw Mangoes", quantity: "1 kg", price: "₹80" },
        { name: "Mustard Seeds", quantity: "50g", price: "₹25" },
        { name: "Fenugreek Seeds", quantity: "30g", price: "₹20" },
        { name: "Red Chili Powder", quantity: "100g", price: "₹40" },
        { name: "Turmeric Powder", quantity: "20g", price: "₹15" },
        { name: "Salt", quantity: "100g", price: "₹10" },
        { name: "Mustard Oil", quantity: "200ml", price: "₹60" }
      ],
      totalCost: "₹250"
    },
    2: { // Mixed Vegetable
      name: "Mixed Vegetable Pickle",
      ingredients: [
        { name: "Carrots", quantity: "300g", price: "₹30" },
        { name: "Cauliflower", quantity: "300g", price: "₹40" },
        { name: "Green Beans", quantity: "200g", price: "₹35" },
        { name: "Turnip", quantity: "200g", price: "₹25" },
        { name: "Spice Mix", quantity: "100g", price: "₹20" }
      ],
      totalCost: "₹150"
    },
    3: { // Lemon Pickle
      name: "Lemon Pickle",
      ingredients: [
        { name: "Fresh Lemons", quantity: "1 kg", price: "₹80" },
        { name: "Salt", quantity: "200g", price: "₹25" },
        { name: "Red Chili Powder", quantity: "50g", price: "₹30" },
        { name: "Turmeric Powder", quantity: "20g", price: "₹20" },
        { name: "Mustard Oil", quantity: "100ml", price: "₹45" }
      ],
      totalCost: "₹200"
    },
    4: { // Garlic Pickle
      name: "Garlic Pickle",
      ingredients: [
        { name: "Fresh Garlic", quantity: "500g", price: "₹100" },
        { name: "Red Chili Powder", quantity: "100g", price: "₹40" },
        { name: "Mustard Seeds", quantity: "30g", price: "₹15" },
        { name: "Salt", quantity: "50g", price: "₹10" },
        { name: "Mustard Oil", quantity: "150ml", price: "₹45" }
      ],
      totalCost: "₹210"
    },
    5: { // Carrot & Turnip
      name: "Carrot & Turnip Pickle",
      ingredients: [
        { name: "Carrots", quantity: "500g", price: "₹50" },
        { name: "Turnip", quantity: "500g", price: "₹60" },
        { name: "Spice Mix", quantity: "80g", price: "₹40" },
        { name: "Mustard Oil", quantity: "120ml", price: "₹36" }
      ],
      totalCost: "₹186"
    },
    6: { // Green Chili
      name: "Green Chili Pickle",
      ingredients: [
        { name: "Green Chilies", quantity: "500g", price: "₹100" },
        { name: "Mustard Seeds", quantity: "40g", price: "₹30" },
        { name: "Salt", quantity: "100g", price: "₹30" },
        { name: "Mustard Oil", quantity: "150ml", price: "₹90" }
      ],
      totalCost: "₹250"
    }
  };

  const handleIngredientOptionChange = (option: string) => {
    setIngredientOption(option);
    setShowPickupAddress(option === 'provide');
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const quantity = parseInt(formData.get('quantity') as string) || 1;
    
    // Calculate total amount
    let productPrice = 0;
    let ingredientCost = 0;
    
    if (selectedProduct && currentProduct) {
      productPrice = parseInt(selectedProduct.price.replace('₹', ''));
      if (ingredientOption === 'buy') {
        ingredientCost = parseInt(currentProduct.totalCost.replace('₹', ''));
      }
    }
    
    const totalAmount = (productPrice + ingredientCost) * quantity;
    
    const summary: OrderSummary = {
      customerName: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string || '',
      deliveryAddress: formData.get('address') as string,
      productName: selectedProduct ? selectedProduct.name : 'Multiple Items',
      productPrice: selectedProduct ? selectedProduct.price : '₹0',
      quantity: quantity,
      ingredientOption: ingredientOption,
      ingredientCost: ingredientOption === 'buy' ? (currentProduct?.totalCost || '₹0') : '₹0',
      pickupAddress: ingredientOption === 'provide' ? (formData.get('pickupAddress') as string) : undefined,
      pickupDate: ingredientOption === 'provide' ? (formData.get('pickupDate') as string) : undefined,
      pickupTime: ingredientOption === 'provide' ? (formData.get('pickupTime') as string) : undefined,
      specialInstructions: formData.get('message') as string || '',
      totalAmount: `₹${totalAmount}`
    };
    
    setOrderSummary(summary);
    setShowOrderSummary(true);
  };

  const handlePayment = () => {
    // Here you would integrate with payment gateway
    alert('Payment functionality would be integrated here!');
    setShowOrderSummary(false);
  };

  const handleCancel = () => {
    setShowOrderSummary(false);
    setOrderSummary(null);
  };

  const currentProduct = selectedProduct ? productIngredients[selectedProduct.id] : null;

  return (
    <div className="contact">
      <div className="contact-content">
        <h1>🥒 {selectedProduct ? `Order ${selectedProduct.name}` : 'Order Your Favorite Pickles!'} 🥒</h1>
        <p>
          {selectedProduct 
            ? `Place your order for ${selectedProduct.name} below. Choose your ingredient preference and we'll prepare it fresh for you!`
            : 'Ready to taste authentic homemade pickles? Place your order below and we\'ll prepare fresh jars just for you!'
          }
        </p>
        
        <div className="contact-form">
          <form onSubmit={handleFormSubmit}>
            {/* Customer Information */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" required />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Delivery Address *</label>
              <textarea id="address" name="address" rows={3} required placeholder="Enter your complete address for delivery"></textarea>
            </div>

            {/* NEW FEATURE: Ingredient Selection for Specific Products */}
            {selectedProduct && currentProduct && (
              <div className="ingredient-section">
                <h3>🥬 Ingredient Options for {currentProduct.name}</h3>
                
                {/* Ingredient List Display */}
                <div className="ingredient-list">
                  <h4>Required Ingredients:</h4>
                  <div className="ingredients-grid">
                    {currentProduct.ingredients.map((ingredient: Ingredient, index: number) => (
                      <div key={index} className="ingredient-item">
                        <span className="ingredient-name">{ingredient.name}</span>
                        <span className="ingredient-quantity">{ingredient.quantity}</span>
                        <span className="ingredient-price">{ingredient.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="total-cost">
                    <strong>Total Ingredient Cost: {currentProduct.totalCost}</strong>
                  </div>
                </div>

                {/* Ingredient Options */}
                <div className="ingredient-options">
                  <h4>Choose Your Ingredient Option:</h4>
                  <div className="radio-options">
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="ingredientOption" 
                        value="buy"
                        checked={ingredientOption === 'buy'}
                        onChange={() => handleIngredientOptionChange('buy')}
                      />
                      <span className="radio-custom"></span>
                      <div className="option-content">
                        <strong>💰 We'll Buy Ingredients</strong>
                        <p>We'll purchase all ingredients and add the cost ({currentProduct.totalCost}) to your order</p>
                      </div>
                    </label>
                    
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="ingredientOption" 
                        value="provide"
                        checked={ingredientOption === 'provide'}
                        onChange={() => handleIngredientOptionChange('provide')}
                      />
                      <span className="radio-custom"></span>
                      <div className="option-content">
                        <strong>🏠 I'll Provide Ingredients</strong>
                        <p>You provide the ingredients and we'll pick them up from your location (Free pickup within 5km)</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* NEW FEATURE: Pickup Address Section */}
                {showPickupAddress && (
                  <div className="pickup-section">
                    <h4>📍 Ingredient Pickup Details</h4>
                    <div className="form-group">
                      <label htmlFor="pickupAddress">Pickup Address *</label>
                      <textarea 
                        id="pickupAddress" 
                        name="pickupAddress" 
                        rows={3} 
                        required 
                        placeholder="Enter the address where we should pick up the ingredients"
                      ></textarea>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="pickupDate">Preferred Pickup Date *</label>
                        <input type="date" id="pickupDate" name="pickupDate" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="pickupTime">Preferred Pickup Time *</label>
                        <select id="pickupTime" name="pickupTime" required>
                          <option value="">Select Time</option>
                          <option value="morning">Morning (9 AM - 12 PM)</option>
                          <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                          <option value="evening">Evening (4 PM - 7 PM)</option>
                        </select>
                      </div>
                    </div>
                    <div className="pickup-info">
                      <p>ℹ️ Our team will call you 30 minutes before pickup</p>
                      <p>ℹ️ Please keep all ingredients ready as per the list above</p>
                      <p>ℹ️ Pickup is free within 5km, ₹50 charge for longer distances</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Regular Pickle Selection (when no specific product selected) */}
            {!selectedProduct && (
              <div className="form-group">
                <label htmlFor="pickles">Select Your Pickles *</label>
                <div className="pickle-options">
                  <label className="checkbox-label">
                    <input type="checkbox" name="pickles" value="mango" />
                    <span className="checkmark">🥭</span>
                    Mango Aachar (Sweet & Spicy) - ₹250/jar
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" name="pickles" value="mixed" />
                    <span className="checkmark">�</span>
                    Mixed Vegetable Pickle - ₹150/jar
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" name="pickles" value="lemon" />
                    <span className="checkmark">🍋</span>
                    Lemon Pickle (Traditional) - ₹200/jar
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" name="pickles" value="garlic" />
                    <span className="checkmark">🧄</span>
                    Garlic Pickle (Extra Spicy) - ₹130/jar
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" name="pickles" value="carrot" />
                    <span className="checkmark">🥕</span>
                    Carrot & Turnip Pickle - ₹110/jar
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" name="pickles" value="chili" />
                    <span className="checkmark">🌶️</span>
                    Green Chili Pickle - ₹250/jar
                  </label>
                </div>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="quantity">Quantity (jars per type)</label>
              <input type="number" id="quantity" name="quantity" min="1" max="10" defaultValue="1" />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Special Instructions</label>
              <textarea id="message" name="message" rows={3} placeholder="Any special requests or delivery instructions?"></textarea>
            </div>
            
            <button type="submit">🛒 Place Order</button>
            
            <div className="order-info">
              <p><strong>📞 Call us:</strong> +91 98765 43210</p>
              <p><strong>💬 WhatsApp:</strong> +91 98765 43210</p>
              <p><strong>🚚 Delivery:</strong> Free delivery within 5km | ₹50 for longer distances</p>
              {selectedProduct && ingredientOption === 'provide' && (
                <p><strong>🏠 Pickup:</strong> Free ingredient pickup within 5km | ₹50 for longer distances</p>
              )}
            </div>
          </form>
        </div>

        {/* Order Summary Popup */}
        {showOrderSummary && orderSummary && (
          <div className="popup-overlay">
            <div className="popup-content">
              <div className="popup-header">
                <h2>📋 Order Summary</h2>
              </div>
              
              <div className="popup-body">
                <div className="summary-section">
                  <h3>Customer Information</h3>
                  <p><strong>Name:</strong> {orderSummary.customerName}</p>
                  <p><strong>Phone:</strong> {orderSummary.phone}</p>
                  {orderSummary.email && <p><strong>Email:</strong> {orderSummary.email}</p>}
                  <p><strong>Delivery Address:</strong> {orderSummary.deliveryAddress}</p>
                </div>

                <div className="summary-section">
                  <h3>Order Details</h3>
                  <p><strong>Product:</strong> {orderSummary.productName}</p>
                  <p><strong>Quantity:</strong> {orderSummary.quantity} jar(s)</p>
                  <p><strong>Product Price:</strong> {orderSummary.productPrice} × {orderSummary.quantity} = ₹{parseInt(orderSummary.productPrice.replace('₹', '')) * orderSummary.quantity}</p>
                </div>

                <div className="summary-section">
                  <h3>Ingredient Option</h3>
                  {orderSummary.ingredientOption === 'buy' ? (
                    <>
                      <p><strong>Option:</strong> 💰 We'll Buy Ingredients</p>
                      <p><strong>Ingredient Cost:</strong> {orderSummary.ingredientCost} × {orderSummary.quantity} = ₹{parseInt(orderSummary.ingredientCost.replace('₹', '')) * orderSummary.quantity}</p>
                    </>
                  ) : (
                    <>
                      <p><strong>Option:</strong> 🏠 You'll Provide Ingredients</p>
                      <p><strong>Pickup Address:</strong> {orderSummary.pickupAddress}</p>
                      <p><strong>Pickup Date:</strong> {orderSummary.pickupDate}</p>
                      <p><strong>Pickup Time:</strong> {orderSummary.pickupTime}</p>
                      <p><strong>Ingredient Cost:</strong> ₹0 (You provide)</p>
                    </>
                  )}
                </div>

                {orderSummary.specialInstructions && (
                  <div className="summary-section">
                    <h3>Special Instructions</h3>
                    <p>{orderSummary.specialInstructions}</p>
                  </div>
                )}

                <div className="summary-total">
                  <h3>Total Amount: {orderSummary.totalAmount}</h3>
                </div>
              </div>
              
              <div className="popup-footer">
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="button" className="pay-btn" onClick={handlePayment}>
                  💳 Pay Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;