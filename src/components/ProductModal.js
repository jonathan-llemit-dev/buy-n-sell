import { useState } from "react";

export default function ProductModal({
  isProductModalOpen,
  onProductModal,
  selectedProduct,
  onAddToCart,
}) {
  const [quantity, setQuantity] = useState(1);

  if (!isProductModalOpen || !selectedProduct) return null;

  const hasDiscount = selectedProduct.storeDiscountPercentage > 0;
  const discountAmount =
    (selectedProduct.price / 100) * selectedProduct.storeDiscountPercentage;
  const discountedPrice = selectedProduct.price - discountAmount;

  const handleCloseModal = () => {
    setQuantity(1);
    onProductModal();
  };

  const handleAddtoCartModal = () => {
    onAddToCart({ ...selectedProduct, quantity });
    handleCloseModal();
  };

  return (
    <div className="modal-overlay" onClick={() => handleCloseModal()}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => handleCloseModal()}>
          &times;
        </button>
        <div className="modal-body">
          <div className="product-content-on-modal">
            <img
              className="product-image-on-modal"
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />
            <div className="product-details-on-modal">
              <p className="product-name-on-modal">{selectedProduct.name}</p>
              <p className="product-description-on-modal">
                {selectedProduct.description}
              </p>
              <p className="product-price-on-modal">
                <span
                  className={
                    hasDiscount
                      ? "discounted-on-modal"
                      : "discounted-price-on-modal"
                  }
                >
                  ₱{selectedProduct.price}
                </span>
                {hasDiscount && (
                  <span className="discounted-price-on-modal">
                    ₱{discountedPrice}
                  </span>
                )}
              </p>
              <p className="product-discount-on-modal">
                {hasDiscount &&
                  `${selectedProduct.storeDiscountPercentage}% off`}
              </p>
              <p className="sold-quantity-on-modal">
                Sold: {selectedProduct.sold}
              </p>
              <p className="product-rating-on-modal">
                Rating: {"⭐".repeat(Math.round(selectedProduct.rating))}
              </p>
            </div>
          </div>

          <div className="product-card-on-modal-footer">
            <div className="product-on-modal-quantity">
              <button
                onClick={() =>
                  setQuantity((quantity) =>
                    quantity > 1 ? quantity - 1 : quantity
                  )
                }
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() =>
                  setQuantity((quantity) =>
                    quantity < selectedProduct.stocks ? quantity + 1 : quantity
                  )
                }
              >
                +
              </button>
              <span className="product-on-modal-stocks">
                {selectedProduct.stocks} stocks left
              </span>
            </div>
            <span>
              Total: ₱{" "}
              {(discountedPrice * quantity).toLocaleString("en-PH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="add-to-cart-wrapper">
            <button
              className="add-to-cart-button-modal"
              onClick={handleAddtoCartModal}
            >
              🛒 Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
