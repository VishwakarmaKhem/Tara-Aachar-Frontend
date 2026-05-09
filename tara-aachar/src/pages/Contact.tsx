import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { Product } from '../api/products';
import './Contact.css';

interface OrderSummary {
  customerName: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  productName: string;
  productPrice: number;
  quantity: number;
  ingredientOption: string;
  pickupAddress?: string;
  pickupDate?: string;
  pickupTime?: string;
  specialInstructions?: string;
  totalAmount: number;
}

const Contact = () => {
  const location = useLocation();
  const selectedProduct = location.state?.product as Product | undefined;

  const [ingredientOption, setIngredientOption] = useState('buy');
  const [showPickupAddress, setShowPickupAddress] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);

  const handleIngredientOptionChange = (option: string) => {
    setIngredientOption(option);
    setShowPickupAddress(option === 'provide');
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const quantity = parseInt(formData.get('quantity') as string) || 1;
    const totalAmount = selectedProduct ? selectedProduct.price * quantity : 0;

    const summary: OrderSummary = {
      customerName: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: (formData.get('email') as string) || '',
      deliveryAddress: formData.get('address') as string,
      productName: selectedProduct ? selectedProduct.title : 'Multiple Items',
      productPrice: selectedProduct ? selectedProduct.price : 0,
      quantity,
      ingredientOption,
      pickupAddress: ingredientOption === 'provide' ? (formData.get('pickupAddress') as string) : undefined,
      pickupDate: ingredientOption === 'provide' ? (formData.get('pickupDate') as string) : undefined,
      pickupTime: ingredientOption === 'provide' ? (formData.get('pickupTime') as string) : undefined,
      specialInstructions: (formData.get('message') as string) || '',
      totalAmount,
    };

    setOrderSummary(summary);
    setShowOrderSummary(true);
  };

  const handlePayment = () => {
    alert('Payment functionality would be integrated here!');
    setShowOrderSummary(false);
  };

  const handleCancel = () => {
    setShowOrderSummary(false);
    setOrderSummary(null);
  };

  return (
    <div className="contact">
      <div className="contact-content">
        <h1>🥒 {selectedProduct ? `Order ${selectedProduct.title}` : 'Order Your Favorite Pickles!'} 🥒</h1>
        <p>
          {selectedProduct
            ? `Place your order for ${selectedProduct.title} below. Choose your ingredient preference and we'll prepare it fresh for you!`
            : "Ready to taste authentic homemade pickles? Place your order below and we'll prepare fresh jars just for you!"}
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
              <textarea id="address" name="address" rows={3} required placeholder="Enter your complete address for delivery" />
            </div>

            {/* Ingredient section — shown for all products from API */}
            {selectedProduct && (
              <div className="ingredient-section">
                <h3>🥬 Ingredient Options for {selectedProduct.title}</h3>

                {/* Ingredients from API */}
                {selectedProduct.ingredients && selectedProduct.ingredients.length > 0 && (
                  <div className="ingredient-list">
                    <h4>Ingredients used:</h4>
                    <div className="ingredients-grid">
                      {selectedProduct.ingredients.map((ing, index) => (
                        <div key={index} className="ingredient-item">
                          <span className="ingredient-name">{ing}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ingredient preference — only if product allows custom ingredients */}
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
                        <p>We'll purchase all ingredients — cost included in product price</p>
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
                        <p>You provide the ingredients and we'll pick them up (Free within 5km)</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Pickup details */}
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
                      />
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

            <div className="form-group">
              <label htmlFor="quantity">Quantity (jars)</label>
              <input type="number" id="quantity" name="quantity" min="1" max="10" defaultValue="1" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Special Instructions</label>
              <textarea id="message" name="message" rows={3} placeholder="Any special requests or delivery instructions?" />
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
                  <p><strong>Price:</strong> ₹{orderSummary.productPrice} × {orderSummary.quantity} = ₹{orderSummary.totalAmount}</p>
                </div>

                <div className="summary-section">
                  <h3>Ingredient Option</h3>
                  {orderSummary.ingredientOption === 'buy' ? (
                    <p><strong>Option:</strong> 💰 We'll Buy Ingredients</p>
                  ) : (
                    <>
                      <p><strong>Option:</strong> 🏠 You'll Provide Ingredients</p>
                      <p><strong>Pickup Address:</strong> {orderSummary.pickupAddress}</p>
                      <p><strong>Pickup Date:</strong> {orderSummary.pickupDate}</p>
                      <p><strong>Pickup Time:</strong> {orderSummary.pickupTime}</p>
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
                  <h3>Total Amount: ₹{orderSummary.totalAmount}</h3>
                </div>
              </div>

              <div className="popup-footer">
                <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                <button type="button" className="pay-btn" onClick={handlePayment}>💳 Pay Now</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
