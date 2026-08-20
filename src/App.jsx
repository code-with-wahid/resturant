import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  Plus,
  Minus,
  X,
  Star,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
  Trash2,
  ChevronRight,
  Sparkles,
  Menu,
} from "lucide-react";
import "./App.css";

const foods = [
  {
    id: 1,
    name: "Truffle Mushroom Pasta",
    category: "Pasta",
    price: 299,
    rating: 4.9,
    time: "20 min",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
    description:
      "Creamy pasta with roasted mushrooms, parmesan and a touch of truffle.",
    tag: "Chef's Pick",
  },
  {
    id: 2,
    name: "Smoky Chicken Burger",
    category: "Burger",
    price: 249,
    rating: 4.8,
    time: "15 min",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    description:
      "Juicy grilled chicken, smoky sauce, fresh lettuce and crispy onions.",
    tag: "Popular",
  },
  {
    id: 3,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 329,
    rating: 4.9,
    time: "25 min",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
    description:
      "Classic Italian pizza with tomato, mozzarella, basil and olive oil.",
    tag: "Classic",
  },
  {
    id: 4,
    name: "Crispy Chicken Wings",
    category: "Starters",
    price: 219,
    rating: 4.7,
    time: "18 min",
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=85",
    description:
      "Golden crispy chicken wings tossed in our signature spicy sauce.",
    tag: "Hot",
  },
  {
    id: 5,
    name: "Paneer Tikka",
    category: "Starters",
    price: 199,
    rating: 4.8,
    time: "20 min",
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=85",
    description:
      "Char-grilled paneer with peppers, onions and aromatic Indian spices.",
    tag: "Veg",
  },
  {
    id: 6,
    name: "Creamy Alfredo",
    category: "Pasta",
    price: 279,
    rating: 4.7,
    time: "20 min",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85",
    description:
      "Silky Alfredo sauce, parmesan and herbs over perfectly cooked pasta.",
    tag: "Creamy",
  },
  {
    id: 7,
    name: "Double Cheese Pizza",
    category: "Pizza",
    price: 399,
    rating: 4.9,
    time: "25 min",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85",
    description:
      "Extra mozzarella, cheddar, tomato sauce and a crispy golden crust.",
    tag: "Bestseller",
  },
  {
    id: 8,
    name: "Chocolate Lava Cake",
    category: "Dessert",
    price: 179,
    rating: 4.9,
    time: "12 min",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85",
    description:
      "Warm chocolate cake with a rich molten chocolate center.",
    tag: "Sweet",
  },
];

const categories = ["All", "Pizza", "Burger", "Pasta", "Starters", "Dessert"];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("restaurant-cart")) || [];
  });
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("restaurant-favorites")) || [];
  });
  const [selectedFood, setSelectedFood] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    localStorage.setItem("restaurant-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("restaurant-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesCategory =
        category === "All" || food.category === category;

      const matchesSearch = food.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal > 499 || subtotal === 0 ? 0 : 40;
  const total = subtotal - discount + delivery;

  const addToCart = (food) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === food.id);

      if (existing) {
        return current.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...food, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "WELCOME10" && subtotal > 0) {
      setCouponApplied(true);
    }
  };

  const placeOrder = (event) => {
    event.preventDefault();

    setCheckoutOpen(false);
    setCart([]);
    setCoupon("");
    setCouponApplied(false);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="app">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* NAVBAR */}
      <header className="navbar">
        <a href="#home" className="logo">
          <span className="logo-icon">🍽️</span>
          <span>
            ELANE<span className="logo-dot">.</span>
          </span>
        </a>

        <nav className={mobileMenu ? "nav-links active" : "nav-links"}>
          <a href="#home" onClick={() => setMobileMenu(false)}>
            Home
          </a>
          <a href="#menu" onClick={() => setMobileMenu(false)}>
            Menu
          </a>
          <a href="#about" onClick={() => setMobileMenu(false)}>
            About
          </a>
          <a href="#contact" onClick={() => setMobileMenu(false)}>
            Contact
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-button favorite-nav"
            onClick={() => {
              setCategory("All");
              setSearch("");
            }}
            aria-label="Favorites"
          >
            <Heart size={20} />
            {favorites.length > 0 && (
              <span className="count-badge">{favorites.length}</span>
            )}
          </button>

          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={19} />
            <span>Cart</span>
            {cartCount > 0 && (
              <strong className="cart-count">{cartCount}</strong>
            )}
          </button>

          <button
            className="mobile-menu"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <Sparkles size={15} />
              PREMIUM FOOD • FRESH EVERY DAY
            </div>

            <h1>
              Good food.
              <br />
              <span>Great mood.</span>
            </h1>

            <p>
              Handcrafted dishes, fresh ingredients and unforgettable
              flavours — delivered straight to your table.
            </p>

            <div className="hero-buttons">
              <a href="#menu" className="primary-button">
                Explore Menu <ArrowRight size={18} />
              </a>

              <a href="#about" className="secondary-button">
                Our Story
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>4.9</strong>
                <span>
                  <Star size={13} fill="currentColor" /> Rating
                </span>
              </div>

              <div>
                <strong>25+</strong>
                <span>Fresh Dishes</span>
              </div>

              <div>
                <strong>20 min</strong>
                <span>Avg. Delivery</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-glow" />

            <div className="hero-card">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=90"
                alt="Fresh restaurant food"
              />

              <div className="floating-rating">
                <Star size={17} fill="currentColor" />
                <div>
                  <strong>4.9/5</strong>
                  <span>2,000+ reviews</span>
                </div>
              </div>

              <div className="floating-delivery">
                <span className="delivery-icon">⚡</span>
                <div>
                  <strong>Fast Delivery</strong>
                  <span>Hot & fresh</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MENU */}
        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <span className="section-label">OUR MENU</span>
              <h2>Choose your favourite.</h2>
              <p>Made fresh. Served hot. Loved instantly.</p>
            </div>

            <div className="search-box">
              <Search size={19} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dishes..."
              />
            </div>
          </div>

          <div className="categories">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="food-grid">
            {filteredFoods.map((food) => (
              <article className="food-card" key={food.id}>
                <div className="food-image">
                  <img src={food.image} alt={food.name} />

                  <span className="food-tag">{food.tag}</span>

                  <button
                    className={
                      favorites.includes(food.id)
                        ? "favorite-button liked"
                        : "favorite-button"
                    }
                    onClick={() => toggleFavorite(food.id)}
                  >
                    <Heart
                      size={18}
                      fill={
                        favorites.includes(food.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                </div>

                <div className="food-info">
                  <div className="food-top">
                    <span>{food.category}</span>

                    <div className="rating">
                      <Star size={14} fill="currentColor" />
                      {food.rating}
                    </div>
                  </div>

                  <h3>{food.name}</h3>

                  <p>{food.description}</p>

                  <div className="food-bottom">
                    <strong>₹{food.price}</strong>

                    <button
                      className="add-button"
                      onClick={() => addToCart(food)}
                    >
                      <Plus size={17} />
                      Add
                    </button>
                  </div>

                  <button
                    className="details-button"
                    onClick={() => setSelectedFood(food)}
                  >
                    View details <ChevronRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredFoods.length === 0 && (
            <div className="empty-search">
              <span>🍽️</span>
              <h3>No dishes found</h3>
              <p>Try another search or category.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Show all dishes
              </button>
            </div>
          )}
        </section>

        {/* PROMO */}
        <section className="promo-section">
          <div>
            <span className="section-label">SPECIAL OFFER</span>
            <h2>
              Your first bite
              <br />
              is <span>10% OFF.</span>
            </h2>
            <p>
              Use code <strong>WELCOME10</strong> at checkout.
            </p>
          </div>

          <a href="#menu" className="promo-button">
            Order now <ArrowRight size={18} />
          </a>
        </section>

        {/* ABOUT */}
        <section className="about-section" id="about">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1100&q=85"
              alt="Restaurant interior"
            />
          </div>

          <div className="about-content">
            <span className="section-label">OUR STORY</span>
            <h2>Food made with a little more love.</h2>
            <p>
              We believe a great restaurant is not just about food. It is
              about the aroma when the plate arrives, the first bite, and
              the people you share it with.
            </p>

            <div className="about-points">
              <div>
                <span>✓</span>
                <p>Fresh ingredients every morning</p>
              </div>
              <div>
                <span>✓</span>
                <p>Chef-crafted recipes</p>
              </div>
              <div>
                <span>✓</span>
                <p>Fast & careful delivery</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact-section" id="contact">
          <div>
            <span className="section-label">COME VISIT</span>
            <h2>Let's eat something amazing.</h2>
            <p>
              Your table is waiting. Come hungry, leave happy.
            </p>
          </div>

          <div className="contact-cards">
            <div>
              <MapPin size={20} />
              <span>Location</span>
              <strong>Chittaranjan, West Bengal</strong>
            </div>

            <div>
              <Clock size={20} />
              <span>Opening Hours</span>
              <strong>11:00 AM — 11:00 PM</strong>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="logo">
          <span className="logo-icon">🍽️</span>
          ELANE<span className="logo-dot">.</span>
        </div>

        <p>Good food. Great mood. ❤️</p>

        <span>© 2026 ELANE Restaurant</span>
      </footer>

      {/* FOOD MODAL */}
      {selectedFood && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedFood(null)}
        >
          <div
            className="food-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedFood(null)}
            >
              <X />
            </button>

            <img
              src={selectedFood.image}
              alt={selectedFood.name}
            />

            <div className="modal-content">
              <span className="section-label">
                {selectedFood.category}
              </span>

              <h2>{selectedFood.name}</h2>

              <div className="modal-rating">
                <Star size={17} fill="currentColor" />
                {selectedFood.rating} • {selectedFood.time}
              </div>

              <p>{selectedFood.description}</p>

              <div className="modal-bottom">
                <strong>₹{selectedFood.price}</strong>

                <button
                  className="primary-button"
                  onClick={() => {
                    addToCart(selectedFood);
                    setSelectedFood(null);
                    setCartOpen(true);
                  }}
                >
                  Add to cart <ShoppingBag size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div
          className="drawer-backdrop"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="cart-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-header">
              <div>
                <span className="section-label">YOUR ORDER</span>
                <h2>Shopping cart</h2>
              </div>

              <button onClick={() => setCartOpen(false)}>
                <X />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={48} />
                <h3>Your cart is empty</h3>
                <p>Add something delicious to get started.</p>

                <button
                  className="primary-button"
                  onClick={() => setCartOpen(false)}
                >
                  Browse menu
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <strong>₹{item.price}</strong>

                        <div className="quantity">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, -1)
                            }
                          >
                            <Minus size={14} />
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              updateQuantity(item.id, 1)
                            }
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <button
                        className="remove-item"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="coupon">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                  />
                  <button onClick={applyCoupon}>Apply</button>
                </div>

                {couponApplied && (
                  <div className="coupon-success">
                    <CheckCircle2 size={16} />
                    WELCOME10 applied — 10% saved!
                  </div>
                )}

                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>₹{subtotal}</strong>
                  </div>

                  <div>
                    <span>Delivery</span>
                    <strong>
                      {delivery === 0 ? "FREE" : `₹${delivery}`}
                    </strong>
                  </div>

                  {discount > 0 && (
                    <div className="discount">
                      <span>Discount</span>
                      <strong>-₹{discount}</strong>
                    </div>
                  )}

                  <div className="total">
                    <span>Total</span>
                    <strong>₹{total}</strong>
                  </div>
                </div>

                <button
                  className="checkout-button"
                  onClick={() => setCheckoutOpen(true)}
                >
                  Checkout <ArrowRight size={18} />
                </button>

                <p className="free-delivery">
                  🚚 Free delivery on orders above ₹499
                </p>
              </>
            )}
          </aside>
        </div>
      )}

      {/* CHECKOUT */}
      {checkoutOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setCheckoutOpen(false)}
        >
          <form
            className="checkout-modal"
            onSubmit={placeOrder}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setCheckoutOpen(false)}
            >
              <X />
            </button>

            <span className="section-label">CHECKOUT</span>
            <h2>Almost there!</h2>
            <p className="checkout-subtitle">
              Enter your delivery details.
            </p>

            <div className="form-grid">
              <label>
                Full name
                <input required placeholder="Your name" />
              </label>

              <label>
                Phone
                <input required type="tel" placeholder="10-digit number" />
              </label>
            </div>

            <label>
              Delivery address
              <textarea required placeholder="House, street, city..." />
            </label>

            <label>
              Payment method
              <select>
                <option>Cash on Delivery</option>
                <option>UPI</option>
                <option>Card</option>
              </select>
            </label>

            <div className="checkout-total">
              <span>Payable amount</span>
              <strong>₹{total}</strong>
            </div>

            <button className="checkout-button" type="submit">
              Place Order <CheckCircle2 size={18} />
            </button>
          </form>
        </div>
      )}

      {/* SUCCESS */}
      {success && (
        <div className="success-toast">
          <CheckCircle2 size={24} />
          <div>
            <strong>Order placed! 🎉</strong>
            <span>Your delicious food is on the way.</span>
          </div>
          <button onClick={() => setSuccess(false)}>
            <X size={17} />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;