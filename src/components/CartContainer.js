import { useEffect, useRef, useState } from "react";
import ProductOnCart from "./ProductOnCart";

export default function CartContainer({
  isOpen,
  onCartOpen,
  cartItems,
  onRemoveToCart,
}) {
  const [selectedProductsOnCart, setSelectedProductsOnCart] = useState([]);

  const ids = selectedProductsOnCart.map((product) => product.id);

  const totalPriceOfSelectedItems = selectedProductsOnCart.reduce(
    (accumulator, product) =>
      accumulator +
      +(
        (product.price -
          (product.price / 100) * product.storeDiscountPercentage) *
        product.quantity
      ),
    0
  );

  const totalPriceOfSelectedItemsDisplay =
    totalPriceOfSelectedItems.toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const totalOriginalPriceOfSelectedItems = selectedProductsOnCart.reduce(
    (accumulator, product) => accumulator + +(product.price * product.quantity),
    0
  );

  const totalOriginalPriceOfSelectedItemsDisplay =
    totalOriginalPriceOfSelectedItems.toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const totalSaved =
    totalOriginalPriceOfSelectedItems - totalPriceOfSelectedItems;

  const totalSavedDisplay = totalSaved.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const totalSelectedItems = selectedProductsOnCart.length;
  const totalCartItems = cartItems.length;

  function handleSelectProduct(selectedProduct) {
    setSelectedProductsOnCart((prevSelected) => {
      const isAlreadySelected = prevSelected.some(
        (p) => p.id === selectedProduct.id
      );
      if (isAlreadySelected) {
        // Remove if already selected
        return prevSelected.filter((p) => p.id !== selectedProduct.id);
      } else {
        // Add if not selected
        return [...prevSelected, selectedProduct];
      }
    });
  }

  function handleSelectAllProduct(selected) {
    selected
      ? setSelectedProductsOnCart(cartItems)
      : setSelectedProductsOnCart([]);
  }

  function handleDeleteButton() {
    setSelectedProductsOnCart((prevSelected) =>
      prevSelected.filter((p) => !ids.includes(p.id))
    );
    onRemoveToCart(ids); // Assumes you pass the IDs to parent for actual removal
  }

  // useEffect to close the cart when clicked outside
  const cartRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target)
      ) {
        onCartOpen(); // This will toggle and close the cart
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onCartOpen]);

  return (
    <div ref={cartRef} className={`cart-container ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2 className="cart-title">🛒 Your Cart</h2>
        <button onClick={onCartOpen} className="close-button">
          X
        </button>
      </div>
      <div className="cart-items-scroll">
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cartItems.map((product, index) => (
            <ProductOnCart
              key={index}
              product={{
                ...product,
                checked: selectedProductsOnCart.some(
                  (p) => p.id === product.id
                ),
              }}
              onSelectProduct={handleSelectProduct}
            />
          ))
        )}
      </div>

      {/* checkout panel */}
      <div className="cart-summary-panel">
        <div className="cart-summary-row">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="select-all-on-cart"
              checked={selectedProductsOnCart.length === cartItems.length && cartItems.length > 0}
              onChange={(e) => handleSelectAllProduct(e.target.checked)}
            />
            <label htmlFor="select-all-on-cart">
              Select All ({totalCartItems})
            </label>
          </div>
          <span className="delete-button" onClick={handleDeleteButton}>
            Delete
          </span>
        </div>

        <div className="cart-summary-row">
          <label htmlFor="voucher">Voucher:</label>
          <input
            type="text"
            id="voucher"
            className="voucher-input"
            placeholder="Enter code"
          />
        </div>

        <div className="cart-summary-row">
          <span className={"discounted-on-cart"}>
            ₱{totalOriginalPriceOfSelectedItemsDisplay}
          </span>
          <span>Saved ₱{totalSavedDisplay}</span>
        </div>

        <div className="cart-summary-row total-row">
          <span>Total: ₱{totalPriceOfSelectedItemsDisplay}</span>
          <button className="add-to-cart-button-modal">
            Check Out ({totalSelectedItems})
          </button>
        </div>
      </div>
    </div>
  );
}
