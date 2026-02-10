import React, { useState, useEffect } from 'react';
import { Search, User, Trash2, Plus, Minus, CreditCard, Wallet, DollarSign, Receipt, X, Menu } from 'lucide-react';

const POSSystem = () => {
  const [cart, setCart] = useState([
    { id: 1, name: 'ITEM - GST 12%', quantity: 1, discount: 0.00, tax: 10.71, price: 100.00, netValue: 100.00 }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [receivedAmount, setReceivedAmount] = useState('100.00');
  const [activePaymentTab, setActivePaymentTab] = useState('cash');
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  // Sample product data
  const products = [
    { id: 1, name: 'Grilled Chicken', price: 12.99, image: '🍗', category: 'Main Course' },
    { id: 2, name: 'Margherita Pizza', price: 14.99, image: '🍕', category: 'Pizza' },
    { id: 3, name: 'Chocolate Cake', price: 6.99, image: '🍰', category: 'Dessert' },
    { id: 4, name: 'Cappuccino', price: 4.50, image: '☕', category: 'Beverages' },
    { id: 5, name: 'Fresh Juice', price: 5.99, image: '🥤', category: 'Beverages' },
    { id: 6, name: 'Caesar Salad', price: 8.99, image: '🥗', category: 'Salads' },
    { id: 7, name: 'Beef Burger', price: 11.99, image: '🍔', category: 'Main Course' },
    { id: 8, name: 'Spaghetti', price: 13.50, image: '🍝', category: 'Pasta' },
    { id: 9, name: 'Cheesecake', price: 7.50, image: '🍰', category: 'Dessert' },
    { id: 10, name: 'Iced Coffee', price: 4.99, image: '🧋', category: 'Beverages' },
    { id: 11, name: 'Greek Salad', price: 9.50, image: '🥗', category: 'Salads' },
    { id: 12, name: 'BBQ Ribs', price: 16.99, image: '🍖', category: 'Main Course' },
    { id: 13, name: 'Pepperoni Pizza', price: 15.99, image: '🍕', category: 'Pizza' },
    { id: 14, name: 'Pasta Carbonara', price: 14.50, image: '🍝', category: 'Pasta' },
    { id: 15, name: 'Tiramisu', price: 7.99, image: '🍮', category: 'Dessert' },
    { id: 16, name: 'Latte', price: 4.75, image: '☕', category: 'Beverages' },
  ];

  const categories = ['All', 'Main Course', 'Pizza', 'Pasta', 'Salads', 'Dessert', 'Beverages'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.netValue, 0).toFixed(2);
  };

  const calculateChange = () => {
    const total = parseFloat(calculateTotal());
    const received = parseFloat(receivedAmount) || 0;
    return Math.max(0, received - total).toFixed(2);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      const newItem = {
        id: Date.now(),
        name: product.name,
        quantity: 1,
        discount: 0,
        tax: (product.price * 0.12).toFixed(2),
        price: product.price,
        netValue: product.price
      };
      setCart([...cart, newItem]);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity, netValue: (item.price * newQuantity).toFixed(2) } : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleNumberPad = (value) => {
    if (value === 'C') {
      setReceivedAmount('0');
    } else if (value === '.') {
      if (!receivedAmount.includes('.')) {
        setReceivedAmount(receivedAmount + '.');
      }
    } else {
      setReceivedAmount(receivedAmount === '0' ? value : receivedAmount + value);
    }
  };

  const handleCheckout = () => {
    alert(`Payment successful! Change: $${calculateChange()}`);
    setCart([]);
    setReceivedAmount('0');
    setCustomerName('');
    setMobileNumber('');
  };

  return (
    <div className="pos-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary: #6366f1;
          --primary-dark: #4f46e5;
          --secondary: #10b981;
          --danger: #ef4444;
          --warning: #f59e0b;
          --dark: #1e293b;
          --dark-lighter: #334155;
          --light: #f8fafc;
          --border: #e2e8f0;
          --text-primary: #0f172a;
          --text-secondary: #64748b;
          --shadow: rgba(15, 23, 42, 0.08);
          --shadow-lg: rgba(15, 23, 42, 0.15);
        }

        body {
          font-family: 'Outfit', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          overflow: hidden;
        }

        .pos-container {
          display: grid;
          grid-template-columns: 1fr 420px;
          height: 100vh;
          gap: 20px;
          padding: 20px;
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Left Panel - Products */
        .products-panel {
          background: white;
          border-radius: 24px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px var(--shadow-lg);
          animation: slideInLeft 0.6s ease-out;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-logo {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .brand-info h1 {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .brand-info p {
          font-size: 13px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .session-info {
          text-align: right;
          font-size: 13px;
          color: var(--text-secondary);
          padding: 12px 20px;
          background: var(--light);
          border-radius: 12px;
          font-weight: 500;
        }

        .session-info div:first-child {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .search-bar {
          position: relative;
          margin-bottom: 20px;
        }

        .search-bar input {
          width: 100%;
          padding: 16px 20px 16px 52px;
          border: 2px solid var(--border);
          border-radius: 16px;
          font-size: 15px;
          font-family: 'Outfit', sans-serif;
          transition: all 0.3s ease;
          background: var(--light);
        }

        .search-bar input:focus {
          outline: none;
          border-color: var(--primary);
          background: white;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .search-bar svg {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }

        .categories {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .categories::-webkit-scrollbar {
          height: 4px;
        }

        .categories::-webkit-scrollbar-thumb {
          background: var(--primary);
          border-radius: 4px;
        }

        .category-btn {
          padding: 10px 20px;
          border: 2px solid var(--border);
          background: white;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          font-family: 'Outfit', sans-serif;
        }

        .category-btn:hover {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.05);
        }

        .category-btn.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 16px;
          overflow-y: auto;
          padding-right: 8px;
        }

        .products-grid::-webkit-scrollbar {
          width: 6px;
        }

        .products-grid::-webkit-scrollbar-thumb {
          background: var(--primary);
          border-radius: 6px;
        }

        .product-card {
          background: white;
          border: 2px solid var(--border);
          border-radius: 16px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          animation: scaleIn 0.3s ease-out;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .product-card:hover {
          border-color: var(--primary);
          transform: translateY(-4px);
          box-shadow: 0 12px 24px var(--shadow);
        }

        .product-image {
          font-size: 48px;
          margin-bottom: 12px;
          display: block;
        }

        .product-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .product-price {
          font-size: 16px;
          font-weight: 700;
          color: var(--primary);
          font-family: 'JetBrains Mono', monospace;
        }

        /* Right Panel - Cart & Checkout */
        .checkout-panel {
          background: white;
          border-radius: 24px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px var(--shadow-lg);
          animation: slideInRight 0.6s ease-out;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .customer-section {
          background: var(--light);
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 20px;
        }

        .customer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          margin-bottom: ${showCustomerDetails ? '12px' : '0'};
        }

        .customer-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .customer-details {
          display: ${showCustomerDetails ? 'flex' : 'none'};
          flex-direction: column;
          gap: 10px;
        }

        .customer-input {
          width: 100%;
          padding: 12px;
          border: 2px solid var(--border);
          border-radius: 10px;
          font-size: 14px;
          font-family: 'Outfit', sans-serif;
          transition: all 0.3s ease;
        }

        .customer-input:focus {
          outline: none;
          border-color: var(--primary);
        }

        .cart-section {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 20px;
        }

        .cart-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr 40px;
          gap: 12px;
          padding: 12px;
          background: var(--light);
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cart-item {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr 40px;
          gap: 12px;
          padding: 16px;
          background: var(--light);
          border-radius: 12px;
          align-items: center;
          font-size: 14px;
          transition: all 0.3s ease;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cart-item:hover {
          background: #e2e8f0;
        }

        .item-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .item-value {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 500;
          color: var(--text-primary);
        }

        .quantity-control {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 6px;
          border-radius: 8px;
        }

        .qty-btn {
          width: 28px;
          height: 28px;
          border: none;
          background: var(--primary);
          color: white;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .qty-btn:hover {
          background: var(--primary-dark);
          transform: scale(1.05);
        }

        .qty-value {
          min-width: 30px;
          text-align: center;
          font-weight: 600;
        }

        .delete-btn {
          width: 36px;
          height: 36px;
          border: none;
          background: var(--danger);
          color: white;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .delete-btn:hover {
          background: #dc2626;
          transform: scale(1.05);
        }

        .payment-section {
          background: var(--light);
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 16px;
        }

        .received-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .number-pad {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 16px;
        }

        .num-btn {
          padding: 16px;
          border: 2px solid var(--border);
          background: white;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'JetBrains Mono', monospace;
        }

        .num-btn:hover {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.05);
          transform: scale(1.05);
        }

        .num-btn:active {
          transform: scale(0.95);
        }

        .payment-buttons {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-top: 12px;
        }

        .payment-btn {
          padding: 14px;
          border: 2px solid var(--border);
          background: white;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'Outfit', sans-serif;
        }

        .payment-btn:hover {
          border-color: var(--secondary);
          background: rgba(16, 185, 129, 0.05);
        }

        .payment-btn.active {
          background: var(--secondary);
          color: white;
          border-color: var(--secondary);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .total-section {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 16px;
          color: white;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .total-label {
          font-size: 18px;
          font-weight: 600;
          opacity: 0.9;
        }

        .total-value {
          font-size: 36px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
        }

        .checkout-btn {
          width: 100%;
          padding: 18px;
          border: none;
          background: var(--secondary);
          color: white;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'Outfit', sans-serif;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        .checkout-btn:hover {
          background: #059669;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(16, 185, 129, 0.4);
        }

        .checkout-btn:active {
          transform: translateY(0);
        }

        .empty-cart {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
        }

        .empty-cart svg {
          margin: 0 auto 20px;
          opacity: 0.3;
        }

        @media (max-width: 1200px) {
          .pos-container {
            grid-template-columns: 1fr;
            overflow-y: auto;
            height: auto;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          }
        }
      `}</style>

      {/* Left Panel - Products */}
      <div className="products-panel">
        <div className="header">
          <div className="brand">
            <div className="brand-logo">🍽️</div>
            <div className="brand-info">
              <h1>Kalyan Hypermarkets</h1>
              <p>Point of Sale System</p>
            </div>
          </div>
          <div className="session-info">
            <div>Session: 5</div>
            <div>Counter: AM</div>
          </div>
        </div>

        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search products or scan barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => addToCart(product)}
            >
              <span className="product-image">{product.image}</span>
              <div className="product-name">{product.name}</div>
              <div className="product-price">${product.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Cart & Checkout */}
      <div className="checkout-panel">
        <div className="customer-section">
          <div className="customer-header" onClick={() => setShowCustomerDetails(!showCustomerDetails)}>
            <div className="customer-title">
              <User size={18} />
              Customer Details
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
              {showCustomerDetails ? '▼' : '▶'}
            </span>
          </div>
          <div className="customer-details">
            <input
              type="text"
              className="customer-input"
              placeholder="Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <input
              type="text"
              className="customer-input"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="cart-section">
          {cart.length > 0 ? (
            <>
              <div className="cart-header">
                <div>Item</div>
                <div>Qty</div>
                <div>Discount</div>
                <div>Tax</div>
                <div>Price</div>
                <div></div>
              </div>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-name">{item.name}</div>
                    <div className="quantity-control">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="item-value">${item.discount}</div>
                    <div className="item-value">${item.tax}</div>
                    <div className="item-value">${item.netValue}</div>
                    <button className="delete-btn" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <Receipt size={64} />
              <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Cart is empty</p>
              <p style={{ fontSize: '14px' }}>Add items from the menu to get started</p>
            </div>
          )}
        </div>

        <div className="payment-section">
          <div className="received-label">Received Amount</div>
          <div className="number-pad">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00', '.'].map((num) => (
              <button
                key={num}
                className="num-btn"
                onClick={() => handleNumberPad(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <div style={{ 
            padding: '16px', 
            background: 'white', 
            borderRadius: '12px', 
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: '700',
            fontFamily: 'JetBrains Mono, monospace',
            color: 'var(--primary)',
            marginBottom: '12px'
          }}>
            ${receivedAmount}
          </div>
          <div className="payment-buttons">
            <button 
              className={`payment-btn ${activePaymentTab === 'wallet' ? 'active' : ''}`}
              onClick={() => setActivePaymentTab('wallet')}
            >
              <Wallet size={18} />
              Wallet
            </button>
            <button 
              className={`payment-btn ${activePaymentTab === 'cash' ? 'active' : ''}`}
              onClick={() => setActivePaymentTab('cash')}
            >
              <DollarSign size={18} />
              Cash
            </button>
            <button 
              className={`payment-btn ${activePaymentTab === 'card' ? 'active' : ''}`}
              onClick={() => setActivePaymentTab('card')}
            >
              <CreditCard size={18} />
              Card
            </button>
            <button className="payment-btn">
              <Menu size={18} />
              Others
            </button>
          </div>
        </div>

        <div className="total-section">
          <div className="total-row">
            <span className="total-label">Total:</span>
            <span className="total-value">${calculateTotal()}</span>
          </div>
        </div>

        <button className="checkout-btn" onClick={handleCheckout} disabled={cart.length === 0}>
          <Receipt size={20} />
          Complete Payment
        </button>
      </div>
    </div>
  );
};

export default POSSystem;
