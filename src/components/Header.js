export default function Header({ onCartOpen }) {
  return (
    <header>
      <h1>💯 Buy-N-Sell </h1>
      <div className="search-bar">
        <input type="text" />
        <button>
          <img className="logo" src="/search.svg" alt="Search Icon" />
        </button>
      </div>
      <button className="cart-button" onClick={onCartOpen}>
        🛒
      </button>
    </header>
  );
}
