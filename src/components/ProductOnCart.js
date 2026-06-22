export default function ProductOnCart({ product, onSelectProduct, onUpdateCartItemQuantity }) {
  const hasDiscount = product.storeDiscountPercentage > 0;
  const totalOriginalPrice = product.price * product.quantity;

  const discountAmount =
    (product.price / 100) * product.storeDiscountPercentage;

  const price = product.price.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const discountedPrice = product.price - discountAmount;

  const discountedPriceDisplay = discountedPrice.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const totalDiscountedPrice = discountedPrice * product.quantity;

  const totalDiscountedPriceDisplay = totalDiscountedPrice.toLocaleString(
    "en-PH",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  return (
    <div className="product-card-on-cart">
      <div className="product-content-on-cart">
        <img
          className="product-image-on-cart"
          src={product.image}
          alt={product.name}
        />
        <div className="product-details-on-cart">
          <p className="product-name-on-cart">{product.name}</p>
          <p className="product-price-on-cart">
            <span className={hasDiscount ? "discounted-on-cart" : ""}>
              ₱{price}
            </span>
            {hasDiscount && (
              <span className="discounted-price-on-cart">
                ₱{discountedPriceDisplay}
              </span>
            )}
          </p>
          <p className="product-discount-on-cart">
            {hasDiscount && `${product.storeDiscountPercentage}% off`}
          </p>
        </div>
        <div className="product-checkbox-on-cart">
          <input
            type="checkbox"
            checked={product.checked}
            onChange={() =>
              onSelectProduct({
                ...product,
                // totalOriginalPrice: totalOriginalPrice,
                // totalDiscountedPrice: totalDiscountedPrice,
              })
            }
          />
        </div>
      </div>

      <div className="product-card-on-cart-footer">
        <div className="product-on-cart-quantity">
          <button onClick={() => product.quantity > 1 && onUpdateCartItemQuantity(product.id, product.quantity - 1)}>-</button>
          <span>{product.quantity}</span>
          <button onClick={() => product.quantity < product.stocks && onUpdateCartItemQuantity(product.id, product.quantity + 1)}>+</button>
          <span className="product-stocks">{`(${product.stocks} stocks left)`}</span>
        </div>
        <span>Total: ₱ {totalDiscountedPriceDisplay}</span>
      </div>
    </div>
  );
}
