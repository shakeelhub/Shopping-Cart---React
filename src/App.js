import React, {
  useState,
  useEffect,
} from "react";
import "./App.css";
import { GiShoppingBag } from "react-icons/gi";
import RatingStars from "./components/RatingStars";
import ShoppingCart from "./components/ShoppingCart";
import 'bootstrap/dist/css/bootstrap.min.css'


// These are the products data which will be displayed in the UI
const products = [
  {
    id: 1,
    name: "Samsung S series",
    rating: 4.3,
    description: " Samsung offers the best build quality among all other Android smartphone manufacturers, especially in the high-end price range",
    price: 799,
    image: require("./assets/product-1.png"),
  },
  {
    id: 2,
    name: "Iphone 14 Pro Max",
    rating: 4.2,
    description:
      "  The iPhone 14 Pro max has ability to be used one-handed. The iPhone 14 has dual 12MP primary and ultrawide cameras ",
    price: 999,
    image: require("./assets/product-2.png"),
  },
  {
    id: 3,
    name: "Samsung Watch",
    rating: 3.2,
    description:
      "Samsung offers the best build quality among all other  smartwatch manufacturers, especially in the high-end price range",
    price: 99,
    image: require("./assets/product-3.png"),
  },
  {
    id: 4,
    name: "Apple Watch",
    rating: 4.8,
    description:
      "Best For Health & Fitness: Garmin Forerunner 255 Music GPS Running Smartwatch",
    price: 119,
    image: require("./assets/product-4.png"),
  },
  {
    id: 5,
    name: "Redmi 12 5G",
    rating: 4.5,
    description:
      "It is dust and splash resistant and has an IP53 rating.",
    price: 85,
    image: require("./assets/product-5.jpg"),
  },
  {
    id: 6,
    name: "Sony Bluetooth",
    rating: 3.8,
    description:
      " Wireless Industry Leading Active Noise Cancelling Headphones",
    price: 149,
    image: require("./assets/product-6.png"),
  },
  {
    id: 7,
    name: "School Bag",
    rating: 4.0,
    description:
      "A small, lightweight backpack to store and carry your day’s supplies",
    price: 69,
    image: require("./assets/product-7.webp"),
  },
  {
    id: 8,
    name: "Wallet",
    rating: 3.5,
    description:
      "Check out the latest selection of wallets for men from Allen Solly",
    price: 49,
    image: require("./assets/product-8.webp"),
  },

];

function App() {
  const [cartsVisibilty, setCartVisible] =
    useState(false);
  const [productsInCart, setProducts] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "shopping-cart"
        )
      ) || []
    );
  useEffect(() => {
    localStorage.setItem(
      "shopping-cart",
      JSON.stringify(productsInCart)
    );
  }, [productsInCart]);


  // This function will be called when we click add to cart button
  const addProductToCart = (product) => {
    const productIndex = productsInCart.findIndex((item) => item.id === product.id);

    if (productIndex !== -1) {
      // If the product is already in the cart, remove it
      setProducts((oldState) => {
        const updatedCart = [...oldState];
        updatedCart.splice(productIndex, 1);
        return updatedCart;
      });
    } else {
      // If the product is not in the cart, add it with a count of 1
      const newProduct = { ...product, count: 1 };
      setProducts([...productsInCart, newProduct]);
    }
  };

  // This function enables us to change the Quantity in cart Items
  const onQuantityChange = (
    productId,
    count
  ) => {
    setProducts((oldState) => {
      const productsIndex =
        oldState.findIndex(
          (item) =>
            item.id === productId
        );
      if (productsIndex !== -1) {
        oldState[productsIndex].count =
          count;
      }
      return [...oldState];
    });
  };

  //This function will be called when we click remove from cart button
  const onProductRemove = (product) => {
    setProducts((oldState) => {
      const productsIndex =
        oldState.findIndex(
          (item) =>
            item.id === product.id
        );
      if (productsIndex !== -1) {
        oldState.splice(productsIndex, 1);
      }
      return [...oldState];
    });
  };

  return (
    <div  className="container-fluid">
      <ShoppingCart
        visibilty={cartsVisibilty}
        products={productsInCart}
        onClose={() =>
          setCartVisible(false)
        }
        onQuantityChange={
          onQuantityChange
        }
        onProductRemove={onProductRemove}
      />

      {/* Navbar Starts */}
      <div className="navbar">
        <h3 className="logo">Logo</h3>
        <nav>
          <ul className="nav-links">
            <li className="nav-item">
              <a href="#home" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="#products" className="nav-link">Products</a>
            </li>
            <li className="dropdown">
              <a href="#more" className="nav-link">More</a>
              <ul className="dropdown-content">
                <li className="nav-item">
                  <a href="#about" className="nav-link">About</a>
                </li>
                <li className="nav-item">
                  <a href="#contact" className="nav-link">Contact</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <button className="cart" onClick={() => setCartVisible(true)}>
          <GiShoppingBag size={15} />
          <span style={{ marginLeft: "5px" }}>Cart</span>
          {productsInCart.length > 0 && (
            <span className="product-count">{productsInCart.length}</span>
          )}
        </button>
        </div>
        {/* Navbar ends */}

        {/* Main Section Starts */}
        <div className="main text-center py-2">
          <h1>Shop in Style</h1>
          <h6>Get All Your Needs Here</h6>
        </div>
      {/* Main Section Ends */}
      
      {/* Products code starts */}
      <main>
        <h2 className="title">
          Products
        </h2>
        <div className="products">
          {products.map((product) => (
            <div
              className="product"
              key={product.id}>
              <img
                 className="product-image "
                src={
                  product.image
                }
                alt={
                  product.image
                }
              />
              <h3 className="product-name">
                {product.name}
              </h3>
              <RatingStars
                rating={
                  product.rating
                }
              />
              <p>
                {
                  product.description
                }
              </p>
              <span className="product-price">
                {product.price}$
              </span>
              
              {/*  */}
              <div className="buttons">
                <button
                  className={`btn ${productsInCart.some((item) => item.id === product.id) ? "remove-button" : ""}`}
                  onClick={() => addProductToCart(product)}
                >
                  {productsInCart.some((item) => item.id === product.id)
                    ? "Remove from cart"
                    : "Add to cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
       {/* Products code ends */}
    </div>
  );
}

export default App;
