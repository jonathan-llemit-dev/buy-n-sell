export default function Product({ product, onProductModal }) {
  const hasDiscount = product.storeDiscountPercentage > 0;
  const discountAmount =
    (product.price / 100) * product.storeDiscountPercentage;
  const discountedPrice = product.price - discountAmount;

  return (
    <div className="product-card" onClick={() => onProductModal(product)}>
      <img className="product-image" src={product.image} alt={product.name} />
      <div className="product-details">
        <div>
          <p className="product-name">{product.name}</p>
          <p className="product-price">
            <span className={hasDiscount ? "discounted" : "discounted-price"}>
              ₱
              {product.price.toLocaleString("en-PH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            {hasDiscount && (
              <span className="discounted-price">
                ₱
                {discountedPrice.toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            )}
          </p>
          <p className="product-discount">
            {hasDiscount && `${product.storeDiscountPercentage}% off`}
          </p>
        </div>
        <div className="product-footer">
          <span className="sold-quantity">Sold {product.sold}</span>
          <span className="product-rating">
            {"⭐".repeat(Math.round(product.rating))}
          </span>
        </div>
      </div>
    </div>
  );
}
