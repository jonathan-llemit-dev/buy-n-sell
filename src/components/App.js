import { useState } from "react";
import Header from "./Header";
import products from "./productsData";
import Product from "./Product";
import Filters from "./Filters";
import CartContainer from "./CartContainer";
import ProductModal from "./ProductModal";

const cartItemsArray = [
  {
    image: "https://picsum.photos/seed/picsum/400/400",
    name: "iPhone 16 Pro Max",
    description: "12GB RAM + 256GB Storage",
    category: ["electronics", "smartphone"],
    price: 70000,
    storeDiscountPercentage: 10,
    storeName: "PowerMac",
    stocks: 10,
    rating: 4,
    sold: 52,
    quantity: 3,
  },
  {
    image: "https://picsum.photos/seed/picsum/400/400",
    name: "Nike Air Max 270",
    description: "Men's Running Shoes",
    category: ["fashion", "footwear"],
    price: 8500,
    storeDiscountPercentage: 0,
    storeName: "Nike Official",
    stocks: 30,
    rating: 4.6,
    sold: 48,
    quantity: 4,
  },
  {
    image: "https://picsum.photos/seed/picsum/400/400",
    name: "Sony WH-1000XM5",
    description: "Wireless Noise-Canceling Headphones",
    category: ["tech", "audio"],
    price: 15999,
    storeDiscountPercentage: 15,
    storeName: "Sony Center",
    stocks: 18,
    rating: 4.9,
    sold: 54,
    quantity: 6,
  },
  {
    image: "https://picsum.photos/seed/picsum/400/400",
    name: "Fitbit Charge 6",
    description: "Fitness & Health Tracker",
    category: ["wearables", "fitness"],
    price: 8999,
    storeDiscountPercentage: 10,
    storeName: "Fitbit Official",
    stocks: 22,
    rating: 4.3,
    sold: 46,
    quantity: 8,
  },
  {
    image: "https://picsum.photos/seed/picsum/400/400",
    name: "Anker PowerCore 20000",
    description: "Portable Charger Power Bank",
    category: ["tech", "accessory"],
    price: 2499,
    storeDiscountPercentage: 20,
    storeName: "Anker Store",
    stocks: 40,
    rating: 4.6,
    sold: 50,
    quantity: 10,
  },
];

export default function App() {
  const uniqueCategories = [
    ...new Set(products.flatMap((product) => product.category)),
  ];
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProductModalOpen, setProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  function handleProductModal(product) {
    setProductModal((isProductModalOpen) => !isProductModalOpen);
    setSelectedProduct(product ? product : null);
  }

  function handleCartOpen() {
    setIsCartOpen((isCartOpen) => !isCartOpen);
  }

  function handleAddToCart(newItem) {
    setCartItems((cartItems) => [...cartItems, newItem]);
  }

  function handleRemoveToCart(ids) {
    setCartItems((cartItems) =>
      cartItems.filter((product) => !ids.includes(product.id))
    );
  }

  return (
    <>
      <div className="App">
        <Header onCartOpen={handleCartOpen} />
        <div className="main-container">
          <Filters uniqueCategories={uniqueCategories} />
          <div className="products-container">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                onProductModal={handleProductModal}
              />
            ))}
          </div>
        </div>
        <CartContainer
          isOpen={isCartOpen}
          onCartOpen={handleCartOpen}
          cartItems={cartItems}
          onRemoveToCart={handleRemoveToCart}
        />
      </div>
      <ProductModal
        isProductModalOpen={isProductModalOpen}
        onProductModal={handleProductModal}
        selectedProduct={selectedProduct}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}
