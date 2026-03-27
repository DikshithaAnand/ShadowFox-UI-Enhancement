import React, { useMemo, useState } from "react";
import { ShoppingCart, Filter, Search, Star, Trash2, CreditCard, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { products as allProducts } from "./data";

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState(5000);
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState("shop");
  const [feedback, setFeedback] = useState("");

  const categories = ["All", ...new Set(allProducts.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let list = allProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.category === category) &&
      p.price <= priceRange
    );

    switch (sortBy) {
      case "priceLow":
        list.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [search, category, sortBy, priceRange]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQty = (id, delta) => setCart(prev =>
    prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
  );

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="app">
      <header className="hero">
        <div>
          <h1>ShopEase UX Enhancement</h1>
          <p>Advanced filtering, sorting, quick cart, and streamlined checkout for a modern e-commerce experience.</p>
        </div>
        <button className="cartBtn" onClick={() => setStep("cart")}>
          <ShoppingCart size={18} /> Cart ({cart.length})
        </button>
      </header>

      {step === "shop" && (
        <>
          <section className="controls">
            <div className="control"><Search size={18} /><input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
            <div className="control"><Filter size={18} />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map(cat => <option key={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="control">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Sort: Featured</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
            <div className="rangeBox">
              <label>Max Price: ₹{priceRange}</label>
              <input type="range" min="500" max="5000" step="500" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} />
            </div>
          </section>

          <section className="resultsBar">
            <span>{filteredProducts.length} products found</span>
            <button className="secondary" onClick={() => {setSearch(""); setCategory("All"); setSortBy("featured"); setPriceRange(5000);}}>Reset Filters</button>
          </section>

          <section className="grid">
            {filteredProducts.map(product => (
              <motion.div layout initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} key={product.id} className="card">
                <div className="emoji">{product.image}</div>
                <h3>{product.name}</h3>
                <p className="muted">{product.category}</p>
                <div className="row">
                  <strong>₹{product.price}</strong>
                  <span className="rating"><Star size={15} /> {product.rating}</span>
                </div>
                <p className={product.stock ? "inStock" : "outStock"}>
                  {product.stock ? "In Stock" : "Out of Stock"}
                </p>
                <button disabled={!product.stock} onClick={() => addToCart(product)}>
                  {product.stock ? "Add to Cart" : "Unavailable"}
                </button>
              </motion.div>
            ))}
          </section>
        </>
      )}

      {step === "cart" && (
        <section className="checkoutWrap">
          <div className="panel">
            <h2>Your Cart</h2>
            {cart.length === 0 ? <p>Your cart is empty.</p> : cart.map(item => (
              <div key={item.id} className="cartItem">
                <div>
                  <h4>{item.name}</h4>
                  <p className="muted">₹{item.price} × {item.qty}</p>
                </div>
                <div className="qtyControls">
                  <button onClick={() => updateQty(item.id, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)}>+</button>
                  <button className="danger" onClick={() => removeFromCart(item.id)}><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            <div className="actions">
              <button className="secondary" onClick={() => setStep("shop")}>Continue Shopping</button>
              {cart.length > 0 && <button onClick={() => setStep("checkout")}>Proceed to Checkout</button>}
            </div>
          </div>
        </section>
      )}

      {step === "checkout" && (
        <section className="checkoutWrap">
          <div className="panel">
            <h2>Fast Checkout</h2>
            <div className="checkoutGrid">
              <input placeholder="Full Name" />
              <input placeholder="Email Address" />
              <input placeholder="Phone Number" />
              <input placeholder="Delivery Address" />
            </div>
            <div className="payment">
              <CreditCard size={18} />
              <span>Payment Method: UPI / Card / COD</span>
            </div>
            <div className="summary">
              <h3>Order Summary</h3>
              <p>Items: {cart.reduce((sum, i) => sum + i.qty, 0)}</p>
              <p>Total: <strong>₹{total}</strong></p>
            </div>
            <div className="feedback">
              <label>User Feedback / UX Suggestion</label>
              <textarea rows="4" placeholder="What can we improve?" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
            </div>
            <div className="actions">
              <button className="secondary" onClick={() => setStep("cart")}>Back</button>
              <button onClick={() => setStep("success")}>Place Order</button>
            </div>
          </div>
        </section>
      )}

      {step === "success" && (
        <section className="checkoutWrap">
          <div className="panel success">
            <CheckCircle2 size={48} />
            <h2>Order Placed Successfully!</h2>
            <p>Your enhanced checkout flow worked perfectly.</p>
            <button onClick={() => {setCart([]); setStep("shop");}}>Shop Again</button>
          </div>
        </section>
      )}
    </div>
  );
}
