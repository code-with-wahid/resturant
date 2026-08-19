import { useState } from "react";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Star,
  ArrowRight,
  Plus,
  Minus,
  MapPin,
  Clock,
  Phone,
} from "lucide-react";
import "./index.css";

const foods = [
  {
    id: 1,
    name: "Truffle Mushroom Pasta",
    category: "Pasta",
    price: 420,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
    rating: 4.9,
    description: "Creamy truffle sauce, wild mushrooms & parmesan.",
  },
  {
    id: 2,
    name: "Classic Margherita",
    category: "Pizza",
    price: 360,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
    rating: 4.8,
    description: "Fresh mozzarella, basil & San Marzano tomatoes.",
  },
  {
    id: 3,
    name: "Smoky BBQ Burger",
    category: "Burger",
    price: 390,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    rating: 4.9,
    description: "Grilled beef, smoked BBQ sauce & crispy onions.",
  },
  {
    id: 4,
    name: "Butter Chicken",
    category: "Indian",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800",
    rating: 4.9,
    description: "Tender chicken in rich tomato-butter gravy.",
  },
  {
    id: 5,
    name: "Sushi Deluxe",
    category: "Asian",
    price: 650,
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
    rating: 4.8,
    description: "Premium sushi selection prepared by our chef.",
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    category: "Dessert",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800",
    rating: 5,
    description: "Warm chocolate cake with a molten center.",
  },
];

const categories = ["All", "Pizza", "Pasta", "Burger", "Indian", "Asian", "Dessert"];

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredFoods = foods.filter((food) => {
    const categoryMatch =
      activeCategory === "All" || food.category === activeCategory;

    const searchMatch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const addToCart = (food) => {
    setCart((current) => {
      const exists = current.find((item) => item.id === food.id);

      if (exists) {
        return current.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...food, quantity: 1 }];
    });
  };

  const increase = (id) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrease = (id) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      {/* NAVBAR */}

      <nav className="navbar">
        <a href="#home" className="logo">
          ÉLANE<span>.</span>
        </a>

        <div className={`nav-links ${mobileMenu ? "show" : ""}`}>
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
        </div>

        <div className="nav-actions">
          <div className="cart-icon">
            <ShoppingBag size={21} />
            {totalItems > 0 && <span>{totalItems}</span>}
          </div>

          <button className="reserve-btn">Reserve Table</button>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* HERO */}

      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-tag">
            <span></span> Fine Dining • Modern Cuisine
          </div>

          <h1>
            Taste the
            <br />
            <i>extraordinary.</i>
          </h1>

          <p>
            A modern culinary experience where bold flavors,
            premium ingredients and unforgettable moments come together.
          </p>

          <div className="hero-buttons">
            <a href="#menu" className="primary-btn">
              Explore Menu <ArrowRight size={18} />
            </a>

            <button className="secondary-btn">Book a Table</button>
          </div>

          <div className="hero-info">
            <div>
              <strong>4.9</strong>
              <span>
                <Star size={14} fill="currentColor" /> Google Rating
              </span>
            </div>

            <div>
              <strong>15+</strong>
              <span>Years of Experience</span>
            </div>

            <div>
              <strong>50+</strong>
              <span>Signature Dishes</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1200"
              alt="Premium food"
            />
          </div>

          <div className="floating-card">
            <div className="mini-image">
              <img
                src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300"
                alt="Chef special"
              />
            </div>

            <div>
              <small>Chef's Special</small>
              <strong>Truffle Pasta</strong>
              <span>★★★★★</span>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <div>
            <span className="eyebrow">OUR MENU</span>
            <h2>Made with passion.</h2>
          </div>

          <p>
            Discover dishes crafted with carefully selected ingredients
            and a little bit of culinary magic.
          </p>
        </div>

        <div className="menu-toolbar">
          <div className="categories">
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="food-grid">
          {filteredFoods.map((food) => (
            <article className="food-card" key={food.id}>
              <div className="food-image">
                <img src={food.image} alt={food.name} />

                <div className="rating">
                  <Star size={13} fill="currentColor" />
                  {food.rating}
                </div>
              </div>

              <div className="food-content">
                <div className="food-top">
                  <div>
                    <span className="food-category">{food.category}</span>
                    <h3>{food.name}</h3>
                  </div>

                  <strong>₹{food.price}</strong>
                </div>

                <p>{food.description}</p>

                <button
                  className="add-btn"
                  onClick={() => addToCart(food)}
                >
                  <Plus size={17} />
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="empty-search">
            No dishes found 😕
          </div>
        )}
      </section>

      {/* ABOUT */}

      <section className="about-section" id="about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000"
            alt="Restaurant interior"
          />
        </div>

        <div className="about-content">
          <span className="eyebrow">OUR STORY</span>

          <h2>
            More than food.
            <br />
            <i>It's an experience.</i>
          </h2>

          <p>
            ÉLANE was born from a simple idea — great food should bring
            people together. Our chefs combine traditional techniques
            with modern creativity to create dishes that surprise,
            comfort and inspire.
          </p>

          <p>
            Every ingredient is carefully selected. Every plate has a
            story. And every guest deserves an unforgettable experience.
          </p>

          <button className="outline-btn">
            Discover Our Story <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* CART */}

      <section className="cart-section">
        <div className="cart-header">
          <div>
            <span className="eyebrow">YOUR ORDER</span>
            <h2>Your basket.</h2>
          </div>

          <span className="cart-count">{totalItems} items</span>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={45} />
            <h3>Your cart is empty</h3>
            <p>Add something delicious from our menu.</p>

            <a href="#menu" className="primary-btn">
              Browse Menu
            </a>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <span>₹{item.price}</span>
                  </div>

                  <div className="quantity">
                    <button onClick={() => decrease(item.id)}>
                      <Minus size={15} />
                    </button>

                    <strong>{item.quantity}</strong>

                    <button onClick={() => increase(item.id)}>
                      <Plus size={15} />
                    </button>
                  </div>

                  <strong className="item-total">
                    ₹{item.price * item.quantity}
                  </strong>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>

              <div>
                <span>Subtotal</span>
                <strong>₹{totalPrice}</strong>
              </div>

              <div>
                <span>Delivery</span>
                <strong>₹40</strong>
              </div>

              <hr />

              <div className="grand-total">
                <span>Total</span>
                <strong>₹{totalPrice + 40}</strong>
              </div>

              <button className="checkout-btn">
                Proceed to Checkout <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* CONTACT */}

      <section className="contact-section" id="contact">
        <div>
          <span className="eyebrow">VISIT ÉLANE</span>
          <h2>Let's make tonight memorable.</h2>
        </div>

        <div className="contact-grid">
          <div>
            <MapPin />
            <h3>Location</h3>
            <p>21 Park Street, Kolkata, India</p>
          </div>

          <div>
            <Clock />
            <h3>Opening Hours</h3>
            <p>Mon – Sun: 11:00 AM – 11:30 PM</p>
          </div>

          <div>
            <Phone />
            <h3>Reservations</h3>
            <p>+91 98765 43210</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer>
        <div className="footer-logo">
          ÉLANE<span>.</span>
        </div>

        <p>© 2026 ÉLANE Restaurant. Crafted with passion.</p>

        <div className="footer-links">
          <a href="#home">Instagram</a>
          <a href="#home">Facebook</a>
          <a href="#home">Privacy</a>
        </div>
      </footer>
    </div>
  );
}

export default App;